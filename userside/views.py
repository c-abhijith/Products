from django.shortcuts import render
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework import status
from .models import *
from .serializer import *
from rest_framework.permissions import AllowAny


# Create your views here.

class MyTokenObtainPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = UserDetails.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer
    