from django.urls import path
from .views import ImageCaptionView

urlpatterns = [
  path('caption/', ImageCaptionView.as_view(), name='image-caption'),
]