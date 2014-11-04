from django.conf.urls import patterns, url
from django.contrib.auth import views as auth_views
from web_copo import views

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),
    url(r'^login/', views.copo_login, name='login'),
    url(r'^logout/', views.copo_logout, name='logout'),
    url(r'^register/', views.copo_register, name='register'),
    url(r'^study/', views.copo_index, name='study'),
    url(r'^study/(?P<pk>\w+)/view', views.copo_study),
)