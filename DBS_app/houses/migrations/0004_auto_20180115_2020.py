# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2018-01-15 20:20
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('houses', '0003_auto_20180115_2019'),
    ]

    operations = [
        migrations.AlterField(
            model_name='floorconfiguration',
            name='description',
            field=models.CharField(max_length=1000),
        ),
    ]
