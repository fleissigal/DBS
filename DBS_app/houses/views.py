# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, Http404
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


def main(request):

	model = get_object_or_404(HousePlan, id=1)
	floor = get_object_or_404(FloorPlan, id=1)
	room = get_object_or_404(RoomPlan, id=1)
	rooms = floor.roomplan_set.all() ## All the rooms in the chosen floor
	optionTypes = get_object_or_404(RoomPlan, id=1).optionTypes.all() # All the option types for the chosen room

	context = {'model':model, 'floor':floor, 'room':room, 'rooms':rooms, 'optionTypes':optionTypes , "optionsToLoad":"" }
	return render(request, 'index.html', context)

# This action is responsible for uploading a new file
@login_required()
def uploadFile(request):

    if request.method == 'POST' and request.FILES['picture']:
        myfile = request.FILES['picture']
        fs = FileSystemStorage()
        filename = fs.save(myfile.name, myfile)
        uploaded_file_url = fs.url(filename)
        return render(request, 'index.html')
    return render(request, 'index.html')

# This function is responsible for rendering the page with the correct
# data from the request (the data is being pulled from the DB)
@login_required()
def configurator(request, username, houseID, floorID, roomID):

	context = {}

	userToSave = User.objects.get(username = username)

	if userToSave.houseconfiguration_set.first():
		model = get_object_or_404(HouseConfiguration, id=userToSave.houseconfiguration_set.first().id)
		floor = get_object_or_404(FloorConfiguration, id=model.floorconfiguration_set.first().id)
		room = get_object_or_404(RoomConfiguration, id=floor.roomconfiguration_set.first().id)
		rooms = floor.roomconfiguration_set.all()
		optionTypes = get_object_or_404(RoomConfiguration, id=room.id).optionTypes.all()
		# Need to fix so that optionChoices has the actual options that were chosen
		# Also need to fix optionsToLoad that is being passes to the context

	else:
		optionList = request.GET.getlist('option')
		optionsToLoad = ""
		if optionList:
			for option in optionList:
				# Fills the optionsToLoad variable with the id's of the options
				if optionList.index(option) != 0:
					optionsToLoad = optionsToLoad + "-"
				optionsToLoad = optionsToLoad + option

		# Getting the information from the DB
		model = get_object_or_404(HousePlan, id=houseID)
		floor = get_object_or_404(FloorPlan, id=floorID)
		room = get_object_or_404(RoomPlan, id=roomID)
		rooms = floor.roomplan_set.all() ## All the rooms in the chosen floor
		optionTypes = get_object_or_404(RoomPlan, id=roomID).optionTypes.all() # All the option types for the chosen room

	context = {'model':model, 'floor':floor, 'room':room, 'rooms':rooms, 'optionTypes':optionTypes , "optionsToLoad":optionsToLoad }
	return render(request, 'index.html', context)


@login_required()
def saveConfiguration(request, username, houseID, floorID, roomID):

	userToSave = User.objects.get(username = username)

	if not userToSave.houseconfiguration_set.first():

		houseConfiguratinoName = username + " " + model.name
		houseConfigurationDescription = username + " " + model.description

		floorConfigurationName = username + " " + floor.name
		floorConfigurationDescription = username + " " + floor.description

		roomConfigurationName = username + " " + room.name
		roomConfigurationDescription = username + " " + room.description

		newHouseConfiguration = HouseConfiguration(name=houseConfiguratinoName, description=houseConfigurationDescription, housePlan=model, user=userToSave)
		newHouseConfiguration.save()
		newFloorConfiguration = FloorConfiguration(name=floorConfigurationName, description=floorConfigurationDescription, floorPlan=floor, houseConfiguration=newHouseConfiguration)
		newFloorConfiguration.save()
		newRoomConfiguration = RoomConfiguration(name=roomConfigurationName, description=roomConfigurationDescription, roomPlan=room, floorConfiguration=newFloorConfiguration)
		newRoomConfiguration.save()
		# Need to fix so that optionChoices has the actual options that were chosen
		# Also need to fix optionsToLoad that is being passes to the context

		model = get_object_or_404(HousePlan, id=houseID)
		floor = get_object_or_404(FloorPlan, id=floorID)
		room = get_object_or_404(RoomPlan, id=roomID)
		rooms = floor.roomplan_set.all() ## All the rooms in the chosen floor
		optionTypes = get_object_or_404(RoomPlan, id=roomID).optionTypes.all() # All the option types for the chosen room

	else:
		
		model = get_object_or_404(HouseConfiguration, id=userToSave.houseconfiguration_set.first().id)
		floor = get_object_or_404(FloorConfiguration, id=model.floorconfiguration_set.first().id)
		room = get_object_or_404(RoomConfiguration, id=floor.roomconfiguration_set.first().id)
		rooms = floor.roomconfiguration_set.all()
		optionTypes = get_object_or_404(RoomConfiguration, id=room.id).optionTypes.all()
		# Change only the choices in this specific room (check which room we are currently
		# editing according to the variable "room" and look for it in the rooms of the user's configuration)

	context = {'model':model, 'floor':floor, 'room':room, 'rooms':rooms, 'optionTypes':optionTypes , "optionsToLoad":"" }
	return render(request, 'index.html', context)

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

	logged_in_user = auth_authenticate(username=form.cleaned_data['username'], password=form.cleaned_data['password'])
	auth_login(request, logged_in_user)

	model = get_object_or_404(HousePlan, id=1)
	floor = get_object_or_404(FloorPlan, id=1)
	room = get_object_or_404(RoomPlan, id=1)
	rooms = floor.roomplan_set.all() ## All the rooms in the chosen floor
	optionTypes = get_object_or_404(RoomPlan, id=1).optionTypes.all() # All the option types for the chosen room

	context = {'model':model, 'floor':floor, 'room':room, 'rooms':rooms, 'optionTypes':optionTypes , "optionsToLoad":"" }
	return render(request, 'index.html', context)

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
	newUser.is_active = True # CHANGE LATER

	newUser.save()

	context['form'] = Login()
	return render(request, "login.html", context)




