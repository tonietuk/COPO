from django.conf.urls import patterns, url
from django.contrib.auth import views as auth_views
from web_copo import views
from web_copo import rest_views


urlpatterns = patterns('',
    url(r'^ena_study_form/', rest_views.get_ena_study_controls, name='get_ena_study_controls'),
)