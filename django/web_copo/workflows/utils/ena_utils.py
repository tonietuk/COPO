__author__ = 'fshaw'

def get_sample_html_from_study_id:

#now get all samples for the collection and return json string
    sample_set = EnaSample.objects.filter(ena_study__id = study.id)

    out = ''
    for s in sample_set:
        out += '<tr><td>' + str(s.title) + '</td><td>' + str(s.description) + '</td><td>' + str(s.scientific_name) \
               + '</td><td>' + str(s.common_name) + '</td></tr>'