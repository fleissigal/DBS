# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# The models of the application


class OptionType(models.Model):
	cabinets = models.CharField(max_length = 1000)

class Option(models.Model):
	optionTypeID = models.ForeignKey(OptionType)

# Need to add a class for OptionChoice ?


### Configurations

class HouseConfiguration(models.Model):
	optionChoice = models.ManyToManyField(Option)
	housePlan = models.ForeignKey(HousePlan)

class FloorConfiguration(models.Model):
	optionChoice = models.ManyToManyField(Option)
	floorPlan = models.ForeignKey(FloorPlan)
	houseConfiguration = models.ForeignKey(HouseConfiguration)

class RoomConfiguration(models.Model):
	optionChoice = models.ManyToManyField(Option)
	roomPlan = models.ForeignKey(RoomPlan)
	floorConfiguration = models.ForeignKey(FloorConfiguration)


### Plans

class HousePlan(models.Model):
	description = models.CharField(max_length = 1000)

class FloorPlan(models.Model):
	description = models.CharField(max_length = 1000)
	housePlan = models.ForeignKey(HousePlan)

class RoomPlan(models.Model):
	description = models.CharField(max_length = 1000)
	floorPlan = models.ForeignKey(FloorPlan)




