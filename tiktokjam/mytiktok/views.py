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
from google.cloud import vision_v1
import json
import requests
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = "snap-market-428419-cf3dcb6ba810.json"



class SerpApiSearchView(APIView):
    def post(self, request, *args, **kwargs):
        caption = request.data.get("caption")
        # Grabs the captions from the analyze_image method
        load_dotenv()
        # Loads the file for the SERPAPI key
        if not caption:
        # Checks to see if I recieved caption
            return Response({"error": "Caption is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            serp_api = SerpApi(api_key=os.environ["SERPAPI"])
            # Givens the API key and sets the API params 
            search_results = serp_api.search_google(caption)
            # Sends the captions to the API, the API searches in google shopping with those captoins and returns the top 5 products
            print(search_results)
            return Response({"search_results": search_results}, status=status.HTTP_200_OK)
            # Returns the top 5 products in as json
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
            temp_dir = os.path.join('media') 
            if not os.path.exists(temp_dir):
                os.makedirs(temp_dir)
            
            # Save the image to the temp directory
            image_path = os.path.join(temp_dir, image.name)
            with open(image_path, 'wb+') as destination:
                for chunk in image.chunks():
                    destination.write(chunk)
            
            print("before analyze img")
            response = analyze_image(image_path)
            print("after")
            
            return Response(response, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

"""
Description: analyze_image takes in an image and utilizies the Google Cloud API and certain features to obtain key words and descriptors.
    It will then return a json for the serpapi to use.
"""

def analyze_image( image_path):
    
    client = vision_v1.ImageAnnotatorClient()
    # print("after client")
    with open(image_path, 'rb') as image_file:
        content = image_file.read()
        
    # Create an AnnotateImageRequest object
    image = vision_v1.Image(content=content)
    features = [
        vision_v1.Feature(type_=vision_v1.Feature.Type.LOGO_DETECTION),
        vision_v1.Feature(type_=vision_v1.Feature.Type.WEB_DETECTION),
        vision_v1.Feature(type_=vision_v1.Feature.Type.IMAGE_PROPERTIES),
        vision_v1.Feature(type_=vision_v1.Feature.Type.TEXT_DETECTION),
    ]

    request = vision_v1.AnnotateImageRequest(image=image, features=features)

    # Make the API call using batch_annotate_images()
    response = client.batch_annotate_images(requests=[request])

    # Retrieve annotations
    logos = [logo.description for logo in response.responses[0].logo_annotations]
    web_entities = [entity.description for entity in response.responses[0].web_detection.web_entities]
    #colors = [color.color for color in response.responses[0].image_properties_annotation.dominant_colors.colors]
    texts = [text.description for text in response.responses[0].text_annotations]


    print("text caption")
    print(texts)
    #color_names = [get_color_name(color) for color in colors]
    
    caption = []

    caption.extend(logos)
    caption.extend(web_entities)
    caption.extend(texts)
    
    #vv removing duplicates
    caption = list(set(caption))
    print(caption)
    word_counts = {}
    for word in caption:
        word = word.lower()
        if word in word_counts:
            word_counts[word]+=1
        else:
            word_counts[word] = 1

    sorted_counts = dict(sorted(word_counts.items(), key=lambda item: item[1], reverse=True))
    sorted_counts = list(sorted_counts.keys())[:7] 
    nice_sentence = ' '.join(sorted_counts)

    json_response = {
        #"caption": caption
        "caption": nice_sentence # Get top 5
    }
    print(json_response)
    #make post
     
    #api call  
    
    response = requests.post('http://localhost:8000/serpapi_search/', data=json_response)
    print(response)
    print(type(response))
    return response
    
