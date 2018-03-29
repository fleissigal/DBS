"""DBS_app URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
import houses.views

urlpatterns = [
    url(r'^$', houses.views.main, name="main"),
    url(r'^uploadFile$', houses.views.uploadFile, name="uploadFile"),
    url(r'^viewer/housePlan=(?P<houseID>[0-9]{1})/floorPlan=(?P<floorID>[0-9]{1})/roomPlan=(?P<roomID>[0-9]{1})/', houses.views.viewer, name="viewer"),
    url(r'^configurator/(?P<username>\w+)/housePlan=(?P<houseID>[0-9]{1})/floorPlan=(?P<floorID>[0-9]{1})/roomPlan=(?P<roomID>[0-9]{1})/', houses.views.configurator, name="configurator"),
    url(r'^saveConfig', houses.views.saveConfig, name="saveConfig"),

    url(r'^login', houses.views.login, name="login"),
    url(r'^register', houses.views.register, name="register"),
    url(r'^logout', houses.views.logout, name="logout"),

]