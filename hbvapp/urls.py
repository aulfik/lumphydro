from django.urls import re_path

from . import views

urlpatterns = [
	# ex: /hbvapp/
    re_path(r'^$', views.home, name='home'),
]