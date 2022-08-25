from email.policy import default
from django.db import models

# Create your models here.

class Product(models.Model):
    Product_name = models.CharField(max_length= 30)
    Product_price = models.FloatField()
    Product_description = models.CharField(max_length= 50)
    inventory = models.IntegerField()


    def __str__(self):
        return self.Product_name


