# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse
from django.conf import settings
from django.core.files.storage import FileSystemStorage

from houses.models import *
# from houses.forms import *

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
def configurator(request, houseID, floorPlanID, roomID, optionID):

	context = {}

	# Getting the information from the DB
	model = get_object_or_404(HousePlan, id=houseID)
	floor = get_object_or_404(FloorPlan, id=floorPlanID)
	rooms = floor.roomplan_set.all() ## All the rooms in the chosen floor
	optionTypes = get_object_or_404(RoomPlan, id=roomID).optionTypes.all() # All the option types for the chosen room
	mainRoom = get_object_or_404(RoomPlan, id=roomID)

	# This array stores all the options in the different dropdown menus (each dropdown menu is a different option type)
	optionTypesList = {}
	for op in optionTypes: #create multiple dictionaries and add them to a new dictionary and finally that dictionary to the context
		optionTypesList[op] = op.option_set.all()

	context = {'model':model, 'floor':floor, 'rooms':rooms, 'mainRoom':mainRoom, 'optionTypes':optionTypes, 'optionTypesList':optionTypesList}

	return render(request, 'index.html', context)


def shareRoom(request, houseID, floorPlanID, roomID, optionID):

	context = {}
	return render(request, 'index.html', context)


