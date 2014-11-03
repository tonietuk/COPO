# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_copo', '0003_collection_submission_data'),
    ]

    operations = [
        migrations.RenameField(
            model_name='collection',
            old_name='submission_data',
            new_name='submission_date',
        ),
    ]
