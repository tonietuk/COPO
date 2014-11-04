# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('web_copo', '0005_remove_study_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='study',
            name='date',
            field=models.DateField(default=datetime.date.today),
            preserve_default=True,
        ),
    ]
