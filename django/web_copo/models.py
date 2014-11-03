from django.db import models
from django.contrib.auth.models import User
from datetime import datetime

# Create your models here.
class Collection(models.Model):
    name = models.CharField(max_length=50)
    user = models.ForeignKey(User)
    submission_date = models.DateField(default=datetime.now, blank=True)
    def __unicode__(self):
        return self.name

class Resource(models.Model):
    name = models.CharField(max_length=50)
    URL = models.CharField(max_length=200)
    collection = models.ForeignKey(Collection)

    def __unicode__(self):
        return self.name