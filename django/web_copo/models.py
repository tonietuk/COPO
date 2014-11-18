from django.db import models
from django.contrib.auth.models import User
import datetime

# Create your models here.

#bundle is the top level container object representing a profile of work
class Bundle(models.Model):
    title = models.CharField(max_length=500)
    abstract = models.TextField(null=True, blank=True)
    abstract_short = models.CharField(max_length=150, null=True, blank=True)
    date_created = models.DateField(default=datetime.date.today)
    date_modified = models.DateField(default=datetime.date.today)
    user = models.ForeignKey(User)
    def __unicode__(self):
        return self.title

#collection represents a type of data submission i.e. ENA, GenBank etc.
class Collection(models.Model):
    name = models.CharField(max_length=50)
    type = models.CharField(max_length=50, default="custom submission")
    bundle = models.ForeignKey(Bundle)
    def __unicode__(self):
        return self.name

#resource is a object which represents raw data as either a file path or a url
class Resource(models.Model):
    name = models.CharField(max_length=50)
    URL = models.CharField(max_length=200, null=True, blank=True)
    path = models.CharField(max_length=200, null=True, blank=True)
    md5_checksum = models.CharField(max_length=200, null=True, blank=True)
    collection = models.ForeignKey(Collection)
    def __unicode__(self):
        return self.name

#the following ENA objects are self explanatory
class ENA_Study(models.Model):
    collection = models.ForeignKey(Collection)
    study_title = models.CharField(max_length=100)
    study_type = models.CharField(max_length=50)
    study_abstract = models.TextField(null=True, blank=True)
    center_name = models.CharField(max_length=50, null=True, blank=True)
    center_project_id = models.CharField(max_length=50, null=True, blank=True)

class ENA_Study_Attr(models.Model):
    ena_study = models.ForeignKey(ENA_Study)
    tag = models.CharField(max_length=50)
    value = models.CharField(max_length=50)
    units = models.CharField(max_length=50, null=True, blank=True)

class ENA_Sample(models.Model):
    ena_study = models.ForeignKey(ENA_Study)
    title = models.CharField(max_length=50, null=True, blank=True)
    taxon_id = models.IntegerField()
    common_name = models.CharField(max_length=50, null=True, blank=True)
    anonymized_name = models.CharField(max_length=50, null=True, blank=True)
    inividual_name = models.CharField(max_length=50, null=True, blank=True)
    description = models.CharField(max_length=200, null=True, blank=True)

class ENA_Sample_Attr(models.Model):
    ena_sample = models.ForeignKey(ENA_Sample)
    tag = models.CharField(max_length=50)
    value = models.CharField(max_length=50)
    units = models.CharField(max_length=50, null=True, blank=True)

class ENA_Experiment(models.Model):
    data = models.ForeignKey(Resource)
    sample_reference = models.ForeignKey(ENA_Study)
    instrument_model = models.CharField(max_length=50, null=True, blank=True)
    library_name = models.CharField(max_length=50, null=True, blank=True)
    library_source = models.CharField(max_length=50, null=True, blank=True)
    library_selection = models.CharField(max_length=50, null=True, blank=True)
    library_strategy = models.CharField(max_length=50, null=True, blank=True)
    design_description = models.CharField(max_length=50, null=True, blank=True)
    library_construction_protocol = models.CharField(max_length=50, null=True, blank=True)
    library_layout = models.CharField(max_length=50, null=True, blank=True)


