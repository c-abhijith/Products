from .models import UserDetails
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        token['role'] = user.role

        # ...
        return token

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:

        model = UserDetails
        fields = "__all__"
        
    def create(self,validated_data):
        user = UserDetails.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            phone_number =validated_data['phone_number'],
            role =validated_data['role'],
            
            


        )
        user.set_password(validated_data['password'])
        print(user)
        user.save()
        return user
    # password2 = serializers.CharField(write_only=True, required=True)

    # class Meta:
    #     model = UserDetails
    #     fields = ('email','username','password', 'password2','phone_number','role')

    # def validate(self, attrs):
    #     if attrs['password'] != attrs['password2']:
    #         raise serializers.ValidationError(
    #             {"password": "Password fields didn't match."})
    #     if UserDetails.objects.filter(phone_number=attrs['phone_number']).exists():
    #         raise serializers.ValidationError(
    #             {"phone_number": "Number already exits."})

    #     if UserDetails.objects.filter(email=attrs['email']).exists():
    #         raise serializers.ValidationError(
    #             {"email": "email already exits."})   

    #     if UserDetails.objects.filter(username=attrs['username']).exists():
    #         raise serializers.ValidationError(
    #             {"username": "username already exits."})             

    #     return attrs

    # def create(self, validated_data):
    #     user = UserDetails.objects.create(
    #         username=validated_data['username'],email=validated_data['email'],phone_number=validated_data['phone_number'],role=validated_data['role']
    #     )

    #     user.set_password(validated_data['password'])
    #     user.save()

    #     return user