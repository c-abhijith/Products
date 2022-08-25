from ast import Delete
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import *
from .serializer import *
from userside.Permitions import UserPermission


# Create your views here.

class ProductDetail(APIView):
    permission_classes = (UserPermission,)  
    def get(self,request):
        print(request.user)
        print(request,"[[[[[[[[[[[[[[[[[[[[[[[[[[[[")
    
        prod = Product.objects.all()
      
        serializer = ProductSerializer(prod,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

    def post(self,request):
        serializer =ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
            
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductDetails(APIView):
    permission_classes = (UserPermission,)
    # def get(self,request,pk):
    
    #     prod = Product.objects.get(id = pk)
      
    #     serializer = ProductSerializer(prod)
    #     return Response(serializer.data,status=status.HTTP_200_OK)

    def put(self,request,pk):
        user = Product.objects.get(id=pk)
        print(user)
        serializer =ProductSerializer(user,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
            
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def delete(self,request,pk):
        Product.objects.get(id = pk).delete()
        return Response(status=status.HTTP_200_OK)
