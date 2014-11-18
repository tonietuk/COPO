# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_copo', '0018_ena_sample_ena_sample_attr'),
    ]

    operations = [
        migrations.CreateModel(
            name='ENA_Experiment',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('instrument_model', models.CharField(max_length=50)),
                ('library_name', models.CharField(max_length=50)),
                ('sample_reference', models.ForeignKey(to='web_copo.ENA_Study')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
