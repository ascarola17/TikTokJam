import os
from google.cloud import vision_v1
import webcolors
import json
import requests
from dotenv import load_dotenv, dotenv_values

# Set the environment variable ??
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = "C:\\Users\\Admin\\Desktop\\AI_EDGE\\snap-market-428419-cf3dcb6ba810.json"
def closest_color( requested_color):
    min_colors = {}
    for key, name in webcolors.CSS3_HEX_TO_NAMES.items():
        r_c, g_c, b_c = webcolors.hex_to_rgb(key)
        rd = (r_c - requested_color.red) ** 2
        gd = (g_c - requested_color.green) ** 2
        bd = (b_c - requested_color.blue) ** 2
        min_colors[(rd + gd + bd)] = name
    return min_colors[min(min_colors.keys())]

def get_color_name( rgb_color):
    try:
        hex_code = webcolors.rgb_to_hex((int(rgb_color.red), int(rgb_color.green), int(rgb_color.blue)))
        closest_name = webcolors.hex_to_name(hex_code)
    except ValueError:
        closest_name = closest_color(rgb_color)
    return closest_name

def analyze_image( image_path):
#client = vision_v1.ImageAnnotatorClient()


    # Initialize the client with ClientOptions
    client = vision_v1.ImageAnnotatorClient()

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
    # content = response.content
    #response = requests.post(url, data=data)


# Provide the path to your local image file
image_path = "C:\\Users\\Admin\\Desktop\\AI_EDGE\\silly.png"
analyze_image(image_path)
