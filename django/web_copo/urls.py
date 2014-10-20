from django.conf.urls import patterns, url

from web_copo import views

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),
)