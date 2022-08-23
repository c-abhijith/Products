from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.


Roles=(
    ('admin', 'admin'),
    ('manager', 'manager'),
    ('staff', 'staff')

)
class UserDetails(AbstractUser):
    phone_number = models.CharField(max_length=12,unique=True)
    role = models.CharField(max_length=10,choices = Roles,default = 'staff')
   


    USERNAME_FIELD = 'email'
    email = models.EmailField(('email address'), unique=True) # changes email to unique and blank to false
    REQUIRED_FIELDS = [phone_number,role] # removes email from REQUIRED_FIELDS
