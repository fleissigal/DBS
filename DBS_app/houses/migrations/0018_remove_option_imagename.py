# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2018-04-13 17:08
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('houses', '0017_auto_20180404_0118'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='option',
            name='imageName',
        ),
    ]
