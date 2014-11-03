# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('web_copo', '0004_auto_20141028_1658'),
    ]

    operations = [
        migrations.AlterField(
            model_name='collection',
            name='submission_date',
            field=models.DateField(default=datetime.datetime.now, blank=True),
        ),
    ]
