# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_copo', '0012_remove_bundle_type'),
    ]

    operations = [
        migrations.RenameField(
            model_name='bundle',
            old_name='date',
            new_name='date_created',
        ),
    ]
