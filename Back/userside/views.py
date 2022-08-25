from django.shortcuts import render
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework import status
from .models import *
from .serializer import *
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny


# Create your views here.

class MyTokenObtainPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    
    serializer_class = MyTokenObtainPairSerializer

class TokenRegisterView(generics.CreateAPIView):
    print("kkkkkkkkkkkkkkkkkkkkkkk")
    queryset = UserDetails.objects.all()
    print(queryset,"ppppppppppppppppp")
    permission_classes = (AllowAny,)
    print(permission_classes,"ooooooooooooo")
    serializer_class = RegisterSerializer




class RegisterView(APIView):

    def get(self, request):
        try:
            print("++++++++++++++++")
            users = UserDetails.objects.all()
        except UserDetails.DoesNotExist:
            return Response({'error': "Datas Not found"}, status=status.HTTP_403_FORBIDDEN)
        print(users)
        serializer = RegisterSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        print(request.data,"=======================================")
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():   
            serializer.save()
        
            return Response(serializer.data, status=status.HTTP_200_OK)

        else:
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    