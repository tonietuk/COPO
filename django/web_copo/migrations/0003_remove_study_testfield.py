# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_copo', '0002_study_testfield'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='study',
            name='testfield',
        ),
    ]
