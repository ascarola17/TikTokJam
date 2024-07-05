from django.urls import path
from .views import SerpApiSearchView

urlpatterns = [
    path('serpapi_search/', SerpApiSearchView.as_view(),name='serpapi-search')
]