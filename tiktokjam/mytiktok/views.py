from rest_framework.response import Response
from rest_framework import status
from .serializers import ImageUploadSerializer
from rest_framework import viewsets
from .models import Item
from .serializers import ItemSerializer
import os

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

'''
Description: A generic viewset model to manipulation and permanently save
image data to the database
'''
class ImageUploadViewSet(viewsets.ViewSet):
    '''
    Description: Retrieves image data from the front and check validity. 
    If valid, then the image will save in a directory called 'media'
    '''
    def create(self, request):
        print("Incoming request data:", request.data)
        serializer = ImageUploadSerializer(data=request.data)
        if serializer.is_valid():
            image = serializer.validated_data['image']
            #print(serializer)
            
            # Ensure the temp directory exists
            temp_dir = os.path.join('media') #may remove temp
            if not os.path.exists(temp_dir):
                os.makedirs(temp_dir)
            
            # Save the image to the temp directory
            image_path = os.path.join(temp_dir, image.name)
            with open(image_path, 'wb+') as destination:
                for chunk in image.chunks():
                    destination.write(chunk)

            return Response({"message": "Image uploaded successfully"}, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
