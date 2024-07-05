from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Item
from .serializers import ItemSerializer

from django.http import JsonResponse
import io
from google.cloud import vision
from django.views.decorators.csrf import csrf_exempt
from . import views


from django.views import View
#from .utils import load_model_and_tokenizer, process_image, generate_caption


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




class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

class ImageCaptionView(View):
    def get(self, request):
        # Get the image URL from the request
        image_url = request.GET.get('image_url')
        if not image_url:
            return JsonResponse({'error': 'No image URL provided'}, status=400)

        # Load model and tokenizer
        tokenizer, model = load_model_and_tokenizer()

        # Process the image
        image_tensor = process_image(image_url)

        # Generate the caption
        caption = generate_caption(image_tensor, tokenizer, model)

        # Convert sets to lists if needed
        if isinstance(caption, set):
            caption = list(caption)

        # Return the caption as JSON
        return JsonResponse({'caption': caption}, safe=False)
    

