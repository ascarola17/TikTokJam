from django.db import models
from transformers import VisionEncoderDecoderModel, ViTFeatureExtractor, AutoTokenizer
from PIL import Image
import torch


#Create your models here

# Description: Holds the details of the product once obtained
# from the Canopy API
class Item(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name
    

###########################################################################################################
class ImageUpload(models.Model):
    image= models.ImageField(upload_to='images/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
############################################################################################################
class ImageCaptionGenerator:
    def __init__(self):
        self.model = VisionEncoderDecoderModel.from_pretrained("nlpconnect/vit-gpt2-image-captioning")
        self.feature_extractor = ViTFeatureExtractor.from_pretrained("nlpconnect/vit-gpt2-image-captioning")
        self.tokenizer = AutoTokenizer.from_pretrained("nlpconnect/vit-gpt2-image-captioning")
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.model.to(self.device)

    def prepare_image(self, image_path):
        image = Image.open(image_path)
        pixel_values = self.feature_extractor(images=image, return_tensors="pt").pixel_values
        pixel_values = pixel_values.to(self.device)
        return pixel_values

    def generate_caption(self, pixel_values):
        output_ids = self.model.generate(pixel_values, max_length=52, num_beams=4, return_dict_in_generate=True).sequences
        caption = self.tokenizer.decode(output_ids[0], skip_special_tokens=True)
        return caption
