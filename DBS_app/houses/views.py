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
	rooms = floor.roomplan_set.all() ## Need to figure out how to reach all the rooms in the specific floor - somehow to go the other direction
	optionTypes = RoomPlan.objects.get(id=roomID).optionTypes
	optionChosen = optionID

	context = {'model':model, 'floor':floor, 'rooms':rooms, 'optionTypes':optionTypes, 'optionChosen':optionChosen}

	return render(request, 'index.html', context)



