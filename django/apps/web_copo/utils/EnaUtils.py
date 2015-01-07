__author__ = 'fshaw'
import time
import os

from django.core.urlresolvers import reverse
from django.core.exceptions import ObjectDoesNotExist

from apps.web_copo.models import EnaStudy, EnaSample


def get_sample_html_from_collection_id(collection_id):

    #get related study and sample set
    try:
        study = EnaStudy.objects.get(collection__id = collection_id)
        sample_set = EnaSample.objects.filter(ena_study__id = study.id)
    except ObjectDoesNotExist:
        return 'not found'

    out = ''
    #construct output html
    for s in sample_set:
        out += '<tr><td>' + '<a rest_url="' + reverse('rest:get_sample_html', args=[str(s.id)]) + '" href="">' + str(s.title) + '</a>' + '</td><td>' + str(s.description) + '</td><td>' + str(s.scientific_name) \
               + '</td><td>' + str(s.common_name) + '</td></tr>'
    return out

def handle_uploaded_file(f):

    #get timestamp
    t = str(time.time()).replace('.', '')
    k = 'file_' + f.name
    path = os.path.join('/Users/fshaw/Desktop/test/', k)
    destination = open(path, 'w+')
    for chunk in f.chunks():
            destination.write(chunk)