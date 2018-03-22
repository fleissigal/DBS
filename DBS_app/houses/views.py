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

# Create your views here.

def main(request):

	return render(request, "index.html", {})

# This action is responsible for uploading a new file
def uploadFile(request):

    if request.method == 'POST' and request.FILES['picture']:
        myfile = request.FILES['picture']
        fs = FileSystemStorage()
        filename = fs.save(myfile.name, myfile)
        uploaded_file_url = fs.url(filename)
        return render(request, 'index.html')
    return render(request, 'index.html')

# This function is responsible for rendering the page with the correct
# data from the request (the data is being pulled form the DB)
@login_required()
def configurator(request, houseID, floorID, roomID):

	context = {}

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
	# mainRoom = get_object_or_404(RoomPlan, id=roomID)

	context = {'model':model, 'floor':floor, 'room':room, 'rooms':rooms, 'optionTypes':optionTypes , "optionsToLoad":optionsToLoad }
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




