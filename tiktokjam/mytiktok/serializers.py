from rest_framework import serializers
from .models import Item
#####################################################
from .models import ImageUpload
#####################################################


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'

class ImageUploadSerializer(serializers.Serializer):
    # image = serializers.ImageField()
    class Meta:
        model = ImageUpload
        fields = ['image']

