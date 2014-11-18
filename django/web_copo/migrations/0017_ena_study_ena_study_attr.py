# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_copo', '0016_auto_20141107_1522'),
    ]

    operations = [
        migrations.CreateModel(
            name='ENA_Study',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('study_title', models.CharField(max_length=100)),
                ('study_type', models.CharField(max_length=50)),
                ('study_abstract', models.TextField(null=True, blank=True)),
                ('center_name', models.CharField(max_length=50, null=True, blank=True)),
                ('center_project_id', models.CharField(max_length=50, null=True, blank=True)),
                ('collection', models.ForeignKey(to='web_copo.Collection')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='ENA_Study_Attr',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('tag', models.CharField(max_length=50)),
                ('value', models.CharField(max_length=50)),
                ('units', models.CharField(max_length=50, null=True, blank=True)),
                ('ena_study', models.ForeignKey(to='web_copo.ENA_Study')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
