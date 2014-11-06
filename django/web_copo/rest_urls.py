from django.conf.urls import patterns, url
from django.contrib.auth import views as auth_views
from web_copo import views
from web_copo import rest_views


urlpatterns = patterns('',
    url(r'^test', rest_views.test, name='test'),
)