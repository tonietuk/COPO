__author__ = 'fshaw'
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from web_copo.models import Collection, Resource, Bundle
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from xml.ena_parsers import get_study_form_controls
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
