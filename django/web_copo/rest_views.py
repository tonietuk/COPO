__author__ = 'fshaw'
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from web_copo.models import Collection, Resource, Bundle
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
import pdb
import xmltodict
import json


class JSONResponse(HttpResponse):
    """
    An HttpResponse that renders its content into JSON.
    """
    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(JSONResponse, self).__init__(content, **kwargs)



def test(request):

    #get submission type and select corresponding form control xml
    submission_type = request.GET['submission_type']
    if submission_type == 'ENA Submission':
        xml_file = 'web_copo/forms_xml/ena/form.xml'
    #open and parse xml
    with open(xml_file) as fd:
        tree = xmltodict.parse(fd.read())
    #get components, convert to json and return
    y = tree['components']['component']
    out = json.dumps(y)
    return JSONResponse(out)
