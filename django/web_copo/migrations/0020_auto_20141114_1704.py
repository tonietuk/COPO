# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_copo', '0019_ena_experiment'),
    ]

    operations = [
        migrations.AddField(
            model_name='ena_experiment',
            name='data',
            field=models.ForeignKey(default=1, to='web_copo.Resource'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='ena_experiment',
            name='design_description',
            field=models.CharField(max_length=50, null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='ena_experiment',
            name='library_construction_protocol',
            field=models.CharField(max_length=50, null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='ena_experiment',
            name='library_layout',
            field=models.CharField(max_length=50, null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='ena_experiment',
            name='library_selection',
            field=models.CharField(max_length=50, null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='ena_experiment',
            name='library_source',
            field=models.CharField(max_length=50, null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='ena_experiment',
            name='library_strategy',
            field=models.CharField(max_length=50, null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='resource',
            name='md5_checksum',
            field=models.CharField(max_length=200, null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='ena_experiment',
            name='instrument_model',
            field=models.CharField(max_length=50, null=True, blank=True),
        ),
        migrations.AlterField(
            model_name='ena_experiment',
            name='library_name',
            field=models.CharField(max_length=50, null=True, blank=True),
        ),
    ]
