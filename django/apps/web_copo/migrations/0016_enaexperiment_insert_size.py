# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_copo', '0015_enaexperiment_platform'),
    ]

    operations = [
        migrations.AddField(
            model_name='enaexperiment',
            name='insert_size',
            field=models.IntegerField(null=True, blank=True),
            preserve_default=True,
        ),
    ]
