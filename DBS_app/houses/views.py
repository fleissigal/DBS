# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, redirect

# Create your views here.

def main(request):

	return render(request, "index.html", {})

def pano_7000(request):

	# return render(request, "pano_7000.jpg", {})
	return redirect("/media/pano_7000.jpg")