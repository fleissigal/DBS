# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

from django.contrib.auth.models import User

# The models of the application


class OptionType(models.Model):
	name = models.CharField(max_length=100)
	description = models.CharField(max_length=1000)
	deafultOption = models.ForeignKey('Option', null=True)

class Option(models.Model):
	name = models.CharField(max_length=100)
	description = models.CharField(max_length=1000)
	optionType = models.ForeignKey(OptionType)
	imageName = models.CharField(max_length=100)
	price = models.IntegerField(default=0)

### Plans

class HousePlan(models.Model):
	name = models.CharField(max_length=100)
	description = models.CharField(max_length=1000)
	deafultFloor = models.ForeignKey('FloorPlan', null=True)
	price = models.IntegerField(default=0)

class FloorPlan(models.Model):
	name = models.CharField(max_length=100)
	description = models.CharField(max_length=1000)
	housePlan = models.ForeignKey(HousePlan)
	imageName = models.CharField(max_length=100)
	deafultRoom = models.ForeignKey('RoomPlan', null=True)

class RoomPlan(models.Model):
	name = models.CharField(max_length=100)
	description = models.CharField(max_length=1000)
	floorPlan = models.ForeignKey(FloorPlan)
	optionTypes = models.ManyToManyField(OptionType, null=True)
	x1 = models.IntegerField()
	y1 = models.IntegerField()
	x2 = models.IntegerField()
	y2 = models.IntegerField()

### Configurations

class HouseConfiguration(models.Model):
	name = models.CharField(max_length=100)
	description = models.CharField(max_length=1000)
	housePlan = models.ForeignKey(HousePlan)
	user = models.ForeignKey(User, null=True)

class FloorConfiguration(models.Model):
	name = models.CharField(max_length=100)
	description = models.CharField(max_length=1000)
	floorPlan = models.ForeignKey(FloorPlan)
	houseConfiguration = models.ForeignKey(HouseConfiguration) # Needed?

class RoomConfiguration(models.Model):
	name = models.CharField(max_length=100)
	description = models.CharField(max_length=1000)
	optionChoices = models.ManyToManyField(Option)
	roomPlan = models.ForeignKey(RoomPlan)
	floorConfiguration = models.ForeignKey(FloorConfiguration) # Needed?


# Do we need name and description for every model? some/all of them can use the name and description
# that are attached to the chosen option


