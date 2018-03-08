# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.conf import settings
from django.core.files.storage import FileSystemStorage

from houses.models import *
# from houses.forms import *

# Create your views here.

def main(request):

	return render(request, "index.html", {})


def uploadFile(request):

    if request.method == 'POST' and request.FILES['picture']:
        myfile = request.FILES['picture']
        fs = FileSystemStorage()
        filename = fs.save(myfile.name, myfile)
        uploaded_file_url = fs.url(filename)
        return render(request, 'index.html')
    return render(request, 'index.html')

def configurator(request, houseID, floorPlanID, roomID, optionID):

	context = {}

	# Getting the information from the DB
	model = HousePlan.objects.get(id=houseID)
	floor = FloorPlan.objects.get(id=floorPlanID)
	rooms = floor.roomplan_set.all() ## reach all the rooms in the specific floor
	optionTypes = RoomPlan.objects.get(id=roomID).optionTypes.all()
	mainRoom = RoomPlan.objects.get(id=roomID)

	optionTypesList = {}
	for op in optionTypes: #create multiple dictionaries and add them to a new dictionary and finally that dictionary to the context
		optionTypesList[op] = op.option_set.all()

	optionChosen = Option.objects.get(id=optionID)

	context = {'model':model, 'floor':floor, 'rooms':rooms, 'mainRoom':mainRoom, 'optionTypes':optionTypes, 'optionTypesList':optionTypesList, 'optionChosen':optionChosen}

	return render(request, 'index.html', context)



