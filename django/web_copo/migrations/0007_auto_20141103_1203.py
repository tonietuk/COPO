# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_copo', '0006_study_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='study',
            name='abstract',
            field=models.TextField(),
        ),
    ]
