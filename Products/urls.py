from django.urls import path
from .import views
from .views import *


urlpatterns = [
    path('details/',ProductDetail.as_view(),name='details'),
    path('details/<int:pk>',ProductDetails.as_view(),name='details'),
  
   
    
]