from django.db import models
from django.contrib.auth.models import User
import datetime

# Create your models here.

class Bundle(models.Model):
    title = models.CharField(max_length=500)
    abstract = models.TextField(null=True, blank=True)
    abstract_short = models.CharField(max_length=150, null=True, blank=True)
    date_created = models.DateField(default=datetime.date.today)
    date_modified = models.DateField(default=datetime.date.today)
    user = models.ForeignKey(User)
    def __unicode__(self):
        return self.title

class Collection(models.Model):
    name = models.CharField(max_length=50)
    type = models.CharField(max_length=50, default="custom submission")
    bundle = models.ForeignKey(Bundle)
    def __unicode__(self):
        return self.name

class Resource(models.Model):
    name = models.CharField(max_length=50)
    URL = models.CharField(max_length=200, null=True, blank=True)
    path = models.CharField(max_length=200, null=True, blank=True)
    collection = models.ForeignKey(Collection)
    def __unicode__(self):
        return self.name