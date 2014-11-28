from django.conf.urls import patterns, url
from django.contrib.auth import views as auth_views
import rest.EnaRest as rest
import pdb



urlpatterns = patterns('',
    url(r'^ena_study_form/', rest.get_ena_study_controls, name='get_ena_study_controls'),
    url(r'^ena_sample_form/', rest.get_ena_sample_controls, name='get_ena_sample_controls'),
    url(r'^ena_study_form_attr/', rest.get_ena_study_attr, name='get_ena_study_attr'),
    url(r'^ena_new_study/', rest.save_ena_study_callback, name='save_ena_study'),
    url(r'^ena_new_sample/', rest.save_ena_sample_callback, name='save_ena_sample'),
    url(r'^populate_samples_form/', rest.populate_samples_form, name='populate_samples_form'),
    url(r'^get_sample_html/(?P<sample_id>\d+)', rest.get_sample_html, name='get_sample_html'),
    url(r'^get_sample_html/', rest.get_sample_html, name='get_sample_html_param'),
)