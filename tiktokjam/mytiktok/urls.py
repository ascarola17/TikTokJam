from django.urls import path
from .views import ImageCaptionView

urlpatterns = [
    path('upload/', ImageCaptionView.as_view(), name='upload_image'),
    path('caption/', ImageCaptionView.as_view(), name='image-caption'),
]