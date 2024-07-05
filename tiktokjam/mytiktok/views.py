from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import ImageUploadSerializer
from rest_framework import viewsets
from mytiktok.models import Item
from mytiktok.serializers import ItemSerializer
from rest_framework import status
from .serp_api import SerpApi
import os
from dotenv import load_dotenv, dotenv_values
from django.http import JsonResponse
import io
from google.cloud import vision
from django.views.decorators.csrf import csrf_exempt
from . import views
from django.views import View


class SerpApiSearchView(APIView):
    def post(self, request, *args, **kwargs):
        caption = request.data.get("caption")
        load_dotenv()
        if not caption:
            return Response({"error": "Caption is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            serp_api = SerpApi(api_key=os.environ["SERPAPI"])
            search_results = serp_api.search_google(caption)
            return Response({"search_results": search_results}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        
        
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
