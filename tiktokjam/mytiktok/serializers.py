from rest_framework import serializers
from .models import Item
from .models import ImageUpload

#allows python to read different types of data 
class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'

# Description: Temporarily saves and processes images (png images)
class ImageUploadSerializer(serializers.Serializer):
    image = serializers.ImageField() #allows you to take in images

