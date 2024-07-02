from rest_framework import serializers
from .models import Item


#####################################################################################################################
# front end
#####################################################################################################################
from .models import ImageUpload

class ImageUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageUpload
        fields = ['image']
#####################################################################################################################

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'