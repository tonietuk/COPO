__author__ = 'fshaw'
from web_copo.models import Collection, Resource, Profile, EnaStudy, EnaSampleAttr, EnaSample, EnaStudyAttr


def get_sample_html_from_collection_id(collection_id):



    study = EnaStudy.objects.get(collection__id = collection_id)

    sample_set = EnaSample.objects.filter(ena_study__id = study.id)

    out = ''
    for s in sample_set:
        out += '<tr><td>' + str(s.title) + '</td><td>' + str(s.description) + '</td><td>' + str(s.scientific_name) \
               + '</td><td>' + str(s.common_name) + '</td></tr>'

    return out