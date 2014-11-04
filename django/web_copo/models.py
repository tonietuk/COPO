from django.db import models
from django.contrib.auth.models import User
import datetime

# Create your models here.

class Study(models.Model):
    title = models.CharField(max_length=500)
    abstract = models.TextField(null=True, blank=True)
    abstract_short = models.CharField(max_length=150, null=True, blank=True)
    type = models.CharField(max_length=100)
    date = models.DateField(default=datetime.date.today)
    user = models.ForeignKey(User)
    def __unicode__(self):
        return self.title

class Collection(models.Model):
    name = models.CharField(max_length=50)
    study = models.ForeignKey(Study)
    def __unicode__(self):
        return self.name

class Resource(models.Model):
    name = models.CharField(max_length=50)
    URL = models.CharField(max_length=200, null=True, blank=True)
    path = models.CharField(max_length=200, null=True, blank=True)
    collection = models.ForeignKey(Collection)

    def __unicode__(self):
        return self.name