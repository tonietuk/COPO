# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_copo', '0017_ena_study_ena_study_attr'),
    ]

    operations = [
        migrations.CreateModel(
            name='ENA_Sample',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=50, null=True, blank=True)),
                ('taxon_id', models.IntegerField()),
                ('common_name', models.CharField(max_length=50, null=True, blank=True)),
                ('anonymized_name', models.CharField(max_length=50, null=True, blank=True)),
                ('inividual_name', models.CharField(max_length=50, null=True, blank=True)),
                ('description', models.CharField(max_length=200, null=True, blank=True)),
                ('ena_study', models.ForeignKey(to='web_copo.ENA_Study')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='ENA_Sample_Attr',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('tag', models.CharField(max_length=50)),
                ('value', models.CharField(max_length=50)),
                ('units', models.CharField(max_length=50, null=True, blank=True)),
                ('ena_sample', models.ForeignKey(to='web_copo.ENA_Sample')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
