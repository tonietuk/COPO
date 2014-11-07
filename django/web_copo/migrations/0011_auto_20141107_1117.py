# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('web_copo', '0010_auto_20141103_1501'),
    ]

    operations = [
        migrations.CreateModel(
            name='Bundle',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=500)),
                ('abstract', models.TextField(null=True, blank=True)),
                ('abstract_short', models.CharField(max_length=150, null=True, blank=True)),
                ('type', models.CharField(max_length=100)),
                ('date', models.DateField(default=datetime.date.today)),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.RemoveField(
            model_name='study',
            name='user',
        ),
        migrations.AlterField(
            model_name='collection',
            name='study',
            field=models.ForeignKey(to='web_copo.Bundle'),
        ),
        migrations.DeleteModel(
            name='Study',
        ),
    ]
