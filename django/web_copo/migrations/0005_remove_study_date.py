# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_copo', '0004_auto_20141103_1158'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='study',
            name='date',
        ),
    ]
