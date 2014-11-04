# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_copo', '0007_auto_20141103_1203'),
    ]

    operations = [
        migrations.AddField(
            model_name='resource',
            name='path',
            field=models.CharField(max_length=200, null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='resource',
            name='URL',
            field=models.CharField(max_length=200, null=True, blank=True),
        ),
    ]
