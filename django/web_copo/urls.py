from django.conf.urls import patterns, url

from web_copo import views

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),
    url(r'^login/', views.try_login_with_orcid_id, name='try_login_with_orcid_id'),
)