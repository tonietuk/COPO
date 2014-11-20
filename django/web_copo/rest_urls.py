from django.conf.urls import patterns, url
from django.contrib.auth import views as auth_views
from web_copo import views
from web_copo import rest_views
import pdb



urlpatterns = patterns('',
    url(r'^ena_study_form/', rest_views.get_ena_study_controls, name='get_ena_study_controls'),
    url(r'^ena_sample_form/', rest_views.get_ena_sample_controls, name='get_ena_sample_controls'),
    url(r'^ena_new_study/', rest_views.save_ena_study_callback, name='save_ena_study'),
)