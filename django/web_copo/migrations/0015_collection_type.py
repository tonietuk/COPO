# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_copo', '0014_bundle_date_modified'),
    ]

    operations = [
        migrations.AddField(
            model_name='collection',
            name='type',
            field=models.CharField(default=b'custom submission', max_length=50),
            preserve_default=True,
        ),
    ]
