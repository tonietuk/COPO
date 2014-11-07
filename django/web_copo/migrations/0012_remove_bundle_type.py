# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_copo', '0011_auto_20141107_1117'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='bundle',
            name='type',
        ),
    ]
