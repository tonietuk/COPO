# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_copo', '0015_collection_type'),
    ]

    operations = [
        migrations.RenameField(
            model_name='collection',
            old_name='study',
            new_name='bundle',
        ),
    ]
