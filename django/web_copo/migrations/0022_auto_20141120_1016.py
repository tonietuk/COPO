# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_copo', '0021_auto_20141119_1603'),
    ]

    operations = [
        migrations.RenameField(
            model_name='ena_study',
            old_name='CENTER_NAME',
            new_name='center_name',
        ),
        migrations.RenameField(
            model_name='ena_study',
            old_name='CENTER_PROJECT_ID',
            new_name='center_project_id',
        ),
        migrations.RenameField(
            model_name='ena_study',
            old_name='STUDY_ABSTRACT',
            new_name='study_abstract',
        ),
        migrations.RenameField(
            model_name='ena_study',
            old_name='STUDY_TITLE',
            new_name='study_title',
        ),
        migrations.RenameField(
            model_name='ena_study',
            old_name='STUDY_TYPE',
            new_name='study_type',
        ),
    ]
