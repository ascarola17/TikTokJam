from django.db import models

#Create your models here

#####################################################################################################################
# waiting on front end
#####################################################################################################################
class ImageUpload(models.Model):
    image = models.ImageField(upload_to="images/") # '/images' indicates the directory where the image loads
    upload_time = models.DateTimeField(auto_now_add=True)
#####################################################################################################################

# Description: Holds the details of the product once obtained
# from the Canopy API
class Item(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name