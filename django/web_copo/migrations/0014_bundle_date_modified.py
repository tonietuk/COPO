# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('web_copo', '0013_auto_20141107_1345'),
    ]

    operations = [
        migrations.AddField(
            model_name='bundle',
            name='date_modified',
            field=models.DateField(default=datetime.date.today),
            preserve_default=True,
        ),
    ]
