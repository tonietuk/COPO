# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_copo', '0008_auto_20141103_1210'),
    ]

    operations = [
        migrations.AddField(
            model_name='study',
            name='abstract_short',
            field=models.CharField(max_length=50, null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='study',
            name='abstract',
            field=models.TextField(null=True, blank=True),
        ),
    ]
