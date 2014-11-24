__author__ = 'fshaw'
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from web_copo.models import Collection, Resource, Profile, EnaStudy, EnaStudyAttr
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from xml.ena_parsers import get_study_form_controls, get_sample_form_controls
import jsonpickle
import pdb


class JSONResponse(HttpResponse):
    """
    An HttpResponse that renders its content into JSON.
    """
    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'

        super(JSONResponse, self).__init__(content, **kwargs)



def get_ena_study_controls(request):
    html = get_study_form_controls('web_copo/xml/schemas/ena/SRA.study.xsd.xml')
    return HttpResponse(html, content_type='html')

def get_ena_sample_controls(request):
    html = get_sample_form_controls('web_copo/xml/schemas/ena/SRA.sample.xsd.xml')
    return HttpResponse(html, content_type='html')

def save_ena_study_callback(request):
    return_type = True;
    values = jsonpickle.decode(request.GET['values'])
    values.pop('', None)
    attributes = jsonpickle.decode(request.GET['attributes'])
    collection_id = request.GET['collection_id']
    #make the collection object
    try:
        e = make_and_save_ena_study(collection_id, **values)
        #now make attribute objects
        for att_group in attributes:
            a = EnaStudyAttr(
                ena_study=e,
                tag=att_group[0],
                value=att_group[1],
                unit=att_group[2]
            )
            a.save()
    except(TypeError):
        return_type = False

    return_structure = {'return_value':return_type}
    out = jsonpickle.encode(return_structure)
    return HttpResponse(out, content_type='json')



def make_and_save_ena_study(c_id, CENTER_NAME, STUDY_DESCRIPTION, STUDY_TYPE, CENTER_PROJECT_NAME, STUDY_ABSTRACT, STUDY_TITLE):
    e = EnaStudy()
    e.collection_id=c_id
    e.study_title=STUDY_TITLE
    e.study_type=STUDY_TYPE
    e.study_abstract=STUDY_ABSTRACT
    e.center_name=CENTER_NAME
    e.study_description=STUDY_DESCRIPTION
    e.center_project_id=CENTER_PROJECT_NAME
    e.save()
    return e
