#in views.py

from django.shortcuts import render
# Create your views here.
from rest_framework import viewsets

from django.http import JsonResponse
import io
from google.cloud import vision
from django.views.decorators.csrf import csrf_exempt
from . import views


from django.views import View


@csrf_exempt
def analyze_image(request):
    if request.method != 'POST' or 'image' not in request.FILES:
        return JsonResponse({'error': 'Invalid request or no image provided'}, status=400)

    image_file = request.FILES['image']
    image_content = image_file.read()

    client = vision.ImageAnnotatorClient()
    image = vision.Image(content=image_content)

    response = client.annotate_image({
        'image': image,
        'features': [
            {'type': vision.Feature.Type.LABEL_DETECTION},
            {'type': vision.Feature.Type.LOGO_DETECTION},
            {'type': vision.Feature.Type.OBJECT_LOCALIZATION},
            {'type': vision.Feature.Type.WEB_DETECTION},
            {'type': vision.Feature.Type.IMAGE_PROPERTIES}
        ]
    })

    labels = [label.description for label in response.label_annotations]
    logos = [logo.description for logo in response.logo_annotations]
    objects = [obj.name for obj in response.localized_object_annotations]
    web_entities = [entity.description for entity in response.web_detection.web_entities]
    colors = [color.color for color in response.image_properties_annotation.dominant_colors.colors]

    return JsonResponse({
        'labels': labels,
        'logos': logos,
        'objects': objects,
        'web_entities': web_entities,
        'colors': colors
    })

#in mytiktokapp urls.py

urlpatterns = [
    #path('caption/', ImageCaptionView.as_view(), name='image-caption'),
    
    path('analyze/', analyze_image.as_view(), name='analyze_image'), #<- google path 
]


#in tiktokjam settings.py


os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = r"C:\Users\Admin\Desktop\AI_EDGE\snap-market-428419-cf3dcb6ba810.json"
