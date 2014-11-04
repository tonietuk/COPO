# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_copo', '0009_auto_20141103_1445'),
    ]

    operations = [
        migrations.AlterField(
            model_name='study',
            name='abstract_short',
            field=models.CharField(max_length=150, null=True, blank=True),
        ),
    ]
