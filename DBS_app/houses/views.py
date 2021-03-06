# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, Http404, HttpResponseRedirect
from django.conf import settings
from django.core.files.storage import FileSystemStorage

from django.core.exceptions import ObjectDoesNotExist

from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib.auth import login as auth_login
from django.contrib.auth import authenticate as auth_authenticate
from django.contrib.auth import logout as auth_logout

from houses.models import *
from houses.forms import *

from django.db import transaction

import json
from django.core.serializers.json import DjangoJSONEncoder
from django.core import serializers

def main(request):

	models = HousePlan.objects.all()

	return render(request, 'homepage.html', {"models":models})

# This action is responsible for uploading a new file. Need to check if things have changed
@login_required()
def uploadFile(request):

    if request.method == 'POST' and request.FILES['picture']:
        myfile = request.FILES['picture']
        fs = FileSystemStorage()
        filename = fs.save(myfile.name, myfile)
        uploaded_file_url = fs.url(filename)
        return render(request, 'index.html')
    return render(request, 'index.html')

def viewer(request, houseID, floorID, roomID):

	# Present the appropriate "configurator" for the details in the params, including options if any, only without a saving option (the warning).
	# To save, allow the user to sign-in and then the user will be redirected to the same url only with "configurator"
	# instead of "viewer" and everything will get saved automatically when changing the dropdown menus
	# there will be a button of "log-in" at the bottom instead of the logout button
	# Also, in the share button, share a link for the VIEWER, not the configurator
	# And allow sharing from the viewer url

	context = {}

	optionsToLoad = ""
	optionList = request.GET.getlist('option')
	if optionList:
		for option in optionList:
			# Fills the optionsToLoad variable with the id's of the options
			if optionList.index(option) != 0:
				optionsToLoad = optionsToLoad + "-"
			optionsToLoad = optionsToLoad + option

	model = get_object_or_404(HousePlan, id=houseID)
	floor = get_object_or_404(FloorPlan, id=floorID)
	room = get_object_or_404(RoomPlan, id=roomID)
	rooms = floor.roomplan_set.all()
	optionTypes = get_object_or_404(RoomPlan, id=roomID).optionTypes.all()

	context = {'model':model, 'floor':floor, 'room':room, 'rooms':rooms, 'optionTypes':optionTypes , "optionsToLoad":optionsToLoad, "viewerMode":"true", "price":model.price }
	return render(request, 'index.html', context)

@login_required()
def summary(request):

	options = None

	user = get_object_or_404(User, username=request.POST['username'])
	housePlan = get_object_or_404(HousePlan, id=request.POST['housePlan'])
	floorPlan = get_object_or_404(FloorPlan, id=request.POST['floorPlan'])
	roomPlan = get_object_or_404(RoomPlan, id=request.POST['roomPlan'])

	houseConfig = None

	usersHouseConfigs = user.houseconfiguration_set.all()
	
	for config in usersHouseConfigs:
		if config.housePlan == housePlan:
			houseConfig = config

	# If the user has a house in edit mode, load this house
	if (houseConfig != None):

		floorConfig = None
		houseConfigsFloorConfigs = houseConfig.floorconfiguration_set.all()

		for config in houseConfigsFloorConfigs:
			if config.floorPlan == floorPlan:
				floorConfig = config

		roomConfig = None
		floorConfigsRoomConfigs = floorConfig.roomconfiguration_set.all()

		for config in floorConfigsRoomConfigs:
			if config.roomPlan == roomPlan:
				roomConfig = config


		# Send inside optionsToLoad all the options from the DB for this specific user's room config.
		options = roomConfig.optionChoices.all()

	# We only want to present the name and the price of every option - in the summary
	serializedOptions = serializers.serialize('json', options, fields=('name', 'price'))

	return HttpResponse(json.dumps({'options':serializedOptions}), content_type="application/json")

@login_required()
def configurator(request, username, houseID, floorID, roomID):

	# Ask for username and houseId, floorID, roomID. If the username already has this specific house in "edit mode", load that house
	# with the right params in the URL.
	# Else, load the house for those params for editing (house=houseID, floor=floorID, room=roomID), and it will get saved when
	# changing the dropdown menus. Alert a message saying you are now editing a new house and it will get saved automatically
	# as you change the dropdown menus

	context = {}

	housePlan = get_object_or_404(HousePlan, id=houseID)
	floorPlan = get_object_or_404(FloorPlan, id=floorID)
	roomPlan = get_object_or_404(RoomPlan, id=roomID)
	rooms = floorPlan.roomplan_set.all()
	optionTypes = roomPlan.optionTypes.all()

	houseConfig = None

	usersHouseConfigs = get_object_or_404(User, username=username).houseconfiguration_set.all()

	for config in usersHouseConfigs:
		if config.housePlan == housePlan:
			houseConfig = config

	optionsToLoad = ""

	# If the user has a house in edit mode, load this house
	if (houseConfig != None):

		floorConfig = None
		houseConfigsFloorConfigs = houseConfig.floorconfiguration_set.all()
		for config in houseConfigsFloorConfigs:
			if config.floorPlan == floorPlan:
				floorConfig = config

		roomConfig = None
		floorConfigsRoomConfigs = floorConfig.roomconfiguration_set.all()
		for config in floorConfigsRoomConfigs:
			if config.roomPlan == roomPlan:
				roomConfig = config


		# Send inside optionsToLoad all the options from the DB for this specific user's room config.
		optionList = roomConfig.optionChoices.all().order_by('id')
		for option in optionList:
			# Fills the optionsToLoad variable with the id's of the options
			optionsToLoad = str(option.id) + "-"
		# DELETES the last character
		optionsToLoad = optionsToLoad[:-1]


	# Else just present the user with the configuration of this house to be able to save in the future
	else:
		optionList = request.GET.getlist('option')
		if optionList:
			for option in optionList:
				# Fills the optionsToLoad variable with the id's of the options
				# Requires sorting of optionList as well (in case it is not sorted according to the order in the url - to begin with)
				if optionList.index(option) != 0:
					optionsToLoad = optionsToLoad + "-"
				optionsToLoad = optionsToLoad + option

	context = {'model':housePlan, 'floor':floorPlan, 'room':roomPlan, 'rooms':rooms, 'optionTypes':optionTypes , "optionsToLoad":optionsToLoad, "viewerMode":"false", "price":housePlan.price }
	return render(request, 'index.html', context)

# Getting called from an ajax function
@login_required()
def saveConfig(request):

	# Getting called automatically from within configurator/username/... with a change in the dropdown menu. Now:

	# If this modelConfig does not exist in the user's configurations, save the following: the model, all its floors and
	# all of the rooms in each floor, with the default options in each room

	# Else, the modelConfig does exist for that user, go to the specific room that's being edited (how do we know that? according to the url)
	# and change the specific option in the DB (replacement), save, and update the price. Go through all the options in it and
	# find the one with the same optionType as the one we want to add, remove it and add the newOption

	# Need to edit this action so that it updates the price from within 'viewer'
	# Also need to fix it so that it presents the price of the model + the prices of all the default options - from the beginning

	context = {}

	houseConfig = None

	newOption = get_object_or_404(Option, id=request.POST['option'])
	user = get_object_or_404(User, username=request.POST['username'])
	housePlan = get_object_or_404(HousePlan, id=request.POST['housePlan'])
	floorPlan = get_object_or_404(FloorPlan, id=request.POST['floorPlan'])
	roomPlan = get_object_or_404(RoomPlan, id=request.POST['roomPlan'])

	usersHouseConfigs = get_object_or_404(User, username=request.POST['username']).houseconfiguration_set.all()

	for config in usersHouseConfigs:
		# from the django docs
		# To compare two model instances, just use the standard Python comparison operator, 
		# the double equals sign: ==. Behind the scenes, that compares the primary key values of two models.
		if config.housePlan == housePlan:
			houseConfig = config

	# If the user has already saved this model config in the past
	if (houseConfig is None):

		# Saving the model

		houseConfigurationName = user.username + " " + housePlan.name
		houseConfigurationDescription = user.username + " " + housePlan.description

		houseConfig = HouseConfiguration(name=houseConfigurationName, description=houseConfigurationDescription, housePlan=housePlan, user=user)
		houseConfig.save()

		# Saving each of the floors

		for fl in housePlan.floorplan_set.all():

			floorConfigurationName = user.username + " " + fl.name
			floorConfigurationDescription = user.username + " " + fl.description

			newFloorConfiguration = FloorConfiguration(name=floorConfigurationName, description=floorConfigurationDescription, floorPlan=fl, houseConfiguration=houseConfig)
			newFloorConfiguration.save()

			# Saving each of the rooms in this floor

			for ro in fl.roomplan_set.all():

				roomConfigurationName = user.username + " " + ro.name
				roomConfigurationDescription = user.username + " " + ro.description

				newRoomConfiguration = RoomConfiguration(name=roomConfigurationName, description=roomConfigurationDescription, roomPlan=ro, floorConfiguration=newFloorConfiguration)

				newRoomConfiguration.save()

				for optionType in ro.optionTypes.all():
					newRoomConfiguration.optionChoices.add(optionType.defaultOption)

				newRoomConfiguration.save()


	floorConfig = None
	houseConfigsFloorConfigs = houseConfig.floorconfiguration_set.all()
	for config in houseConfigsFloorConfigs:
		if config.floorPlan == floorPlan:
			floorConfig = config

	roomConfig = None
	floorConfigsRoomConfigs = floorConfig.roomconfiguration_set.all()
	for config in floorConfigsRoomConfigs:
		if config.roomPlan == roomPlan:
			roomConfig = config

	roomOptionChoices = roomConfig.optionChoices.all()

	# Replacing the old option with the new one and updating the price
	oldPrice = 0
	newPrice = newOption.price

	for option in roomOptionChoices:
		if (newOption.optionType == option.optionType):
			oldPrice = option.price

			with transaction.atomic():
				roomConfig.optionChoices.remove(option)
				roomConfig.optionChoices.add(newOption)
				roomConfig.save()

	price = int(request.POST['price']) - oldPrice + newPrice

	return HttpResponse(json.dumps({'price':price}), content_type="application/json")


def login(request):

	context = {}

	# In case the user reloaded the page
	if request.method == 'GET':
		context['form'] = Login()
		return render(request, 'login.html', context)

	form = Login(request.POST)
	context['form'] = form

	if not form.is_valid():
		return render(request, 'login.html', context)

	username = form.cleaned_data['username']
	password=form.cleaned_data['password']

	logged_in_user = auth_authenticate(username=username, password=password)
	auth_login(request, logged_in_user)

	# Change later so it goes to the configurator url that we got redirected from
	url = '/configurator/%s/housePlan=%s/floorPlan=%s/roomPlan=%s' % (username, "1", "1", "1")
	return HttpResponseRedirect(url)

def logout(request):

	auth_logout(request)
	return redirect('login.html')

def register(request):

	context = {}

	# In case the user reloaded the page
	if request.method == 'GET':
		context['form'] = Registration()
		return render(request, 'register.html', context)


	form = Registration(request.POST)
	context['form'] = form
	if not form.is_valid():
		return render(request, 'register.html', context)

	newUser = User.objects.create_user(username=form.cleaned_data['username'], password=form.cleaned_data['password'])
	newUser.is_active = True # CHANGE LATER when we want to add the email confirmation feature

	newUser.save()

	context['form'] = Login()
	return render(request, "login.html", context)




