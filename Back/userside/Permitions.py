from rest_framework import permissions

class UserPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        return (request.user.role == "admin" or(request.user.role == "manager" and (request.method=='GET' or request.method=='PUT')))