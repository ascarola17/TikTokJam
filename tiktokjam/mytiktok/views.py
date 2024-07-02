from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ImageUploadSerializer
from .models import ImageCaptionGenerator
from rest_framework import viewsets
from .models import Item
from .serializers import ItemSerializer
import os

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

class ImageCaptionView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = ImageUploadSerializer(data=request.data)
        if serializer.is_valid():
            image = serializer.validated_data['image']
            
            # Ensure the temp directory exists
            temp_dir = "temp"
            if not os.path.exists(temp_dir):
                os.makedirs(temp_dir)
            
            image_path = os.path.join(temp_dir, image.name)
            with open(image_path, 'wb+') as destination:
                for chunk in image.chunks():
                    destination.write(chunk)

            caption_generator = ImageCaptionGenerator()
            pixel_values = caption_generator.prepare_image(image_path)
            caption = caption_generator.generate_caption(pixel_values)
            return Response({"caption": caption}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)