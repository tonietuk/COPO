from django.conf.urls import patterns, url
from django.contrib.auth import views as auth_views
from web_copo import views

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),
    url(r'^login/', views.copo_login, name='login'),
    url(r'^logout/', views.copo_logout, name='logout'),
    url(r'^register/', views.copo_register, name='register'),
    url(r'^new_bundle/', views.new_bundle, name='new_bundle'),
    url(r'^bundle/(?P<pk>\w+)/view', views.view_bundle),
    url(r'^new_collection/', views.new_collection, name='new_collection'),
    url(r'^collection/(?P<collection_id>\w+)/view', views.view_collection),
)