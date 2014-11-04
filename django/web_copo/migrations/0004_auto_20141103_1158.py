# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_copo', '0003_remove_study_testfield'),
    ]

    operations = [
        migrations.AlterField(
            model_name='study',
            name='date',
            field=models.DateField(auto_now=True),
        ),
    ]
