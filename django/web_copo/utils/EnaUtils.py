__author__ = 'fshaw'
from web_copo.models import Collection, Resource, Profile, EnaStudy, EnaSampleAttr, EnaSample, EnaStudyAttr
from django.core.urlresolvers import reverse


def get_sample_html_from_collection_id(collection_id):

    #get related study and sample set
    study = EnaStudy.objects.get(collection__id = collection_id)
    sample_set = EnaSample.objects.filter(ena_study__id = study.id)

    out = ''
    #construct output html
    for s in sample_set:
        out += '<tr><td>' + '<a rest_url="' + reverse('rest:get_sample_html', args=[str(s.id)]) + '" href="">' + str(s.title) + '</a>' + '</td><td>' + str(s.description) + '</td><td>' + str(s.scientific_name) \
               + '</td><td>' + str(s.common_name) + '</td></tr>'
    return out