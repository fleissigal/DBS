# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2018-03-21 15:16
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('houses', '0015_houseplan_price'),
    ]

    operations = [
        migrations.RenameField(
            model_name='roomplan',
            old_name='heightPosition',
            new_name='x1',
        ),
        migrations.RenameField(
            model_name='roomplan',
            old_name='leftPosition',
            new_name='x2',
        ),
        migrations.RenameField(
            model_name='roomplan',
            old_name='topPosition',
            new_name='y1',
        ),
        migrations.RenameField(
            model_name='roomplan',
            old_name='widthPosition',
            new_name='y2',
        ),
        migrations.AlterField(
            model_name='houseplan',
            name='price',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='option',
            name='price',
            field=models.IntegerField(default=0),
        ),
    ]
