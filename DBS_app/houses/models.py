# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# The models of the application


class OptionType(models.Model):
	name = models.CharField(max_length=100)
	description = models.CharField(max_length=1000)

class Option(models.Model):
	name = models.CharField(max_length=100)
	description = models.CharField(max_length=1000)
	optionType = models.ForeignKey(OptionType)

### Plans

class HousePlan(models.Model):
	name = models.CharField(max_length=100)
	description = models.CharField(max_length=1000)

class FloorPlan(models.Model):
	name = models.CharField(max_length=100)
	description = models.CharField(max_length=1000)
	housePlan = models.ForeignKey(HousePlan)

class RoomPlan(models.Model):
	name = models.CharField(max_length=100)
	description = models.CharField(max_length=1000)
	floorPlan = models.ForeignKey(FloorPlan)
	optionTypes = models.ManyToManyField(OptionType)

### Configurations

class HouseConfiguration(models.Model):
	name = models.CharField(max_length=100)
	description = models.CharField(max_length=1000)
	housePlan = models.ForeignKey(HousePlan)

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


