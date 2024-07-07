from django.db import models
from PIL import Image

#Create your models here

# Description: Holds the details of the product once obtained
# from the Canopy API
class Item(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name
    
class ImageUpload(models.Model):
    image= models.ImageField(upload_to='images/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    