# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_copo', '0020_auto_20141114_1704'),
    ]

    operations = [
        migrations.RenameField(
            model_name='ena_study',
            old_name='center_name',
            new_name='CENTER_NAME',
        ),
        migrations.RenameField(
            model_name='ena_study',
            old_name='center_project_id',
            new_name='CENTER_PROJECT_ID',
        ),
        migrations.RenameField(
            model_name='ena_study',
            old_name='study_abstract',
            new_name='STUDY_ABSTRACT',
        ),
        migrations.RenameField(
            model_name='ena_study',
            old_name='study_title',
            new_name='STUDY_TITLE',
        ),
        migrations.RenameField(
            model_name='ena_study',
            old_name='study_type',
            new_name='STUDY_TYPE',
        ),
    ]
