# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# The models of the application

class HousePlan(models.Model):
	description = models.CharField(max_length = 1000)
	floorPlan = models.ForeignKey(FloorPlan)
	houseConfiguration = models.ForeignKey(HouseConfiguration)

class FloorPlan(models.Model):
	description = models.CharField(max_length = 1000)
	roomPlan = models.ForeignKey(RoomPlan)
	floorConfiguration = models.ForeignKey(FloorConfiguration)

class RoomPlan(models.Model):
	description = models.CharField(max_length = 1000)
	roomConfiguration = models.ForeignKey(RoomConfiguration)



class HouseConfiguration(models.Model):
	optionChoice = models.ManyToManyField(Option)

class FloorConfiguration(models.Model):
	optionChoice = models.ManyToManyField(Option)

class RoomConfiguration(models.Model):
	optionChoice = models.ManyToManyField(Option)




class OptionType(models.Model):


class Option(models.Model):
	optionTypeID = models.ForeignKey(OptionType)

# Need to add a class for OptionChoice ?






	aaa = models.ManyToManyField(RoomPlan)