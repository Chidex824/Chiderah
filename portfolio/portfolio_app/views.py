from django.shortcuts import render
from django.utils import timezone
from django.db.models import Q
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import *
from .serializers import *
import uuid

# Create your views here.

Class About/IntroductionView(APIView):
    """UserView"""
    permission_classes = [AllowAny]
    def get( self, request ):
        name = request.data.get('name')
        title = request.data.get('title')
        description = request.data.get('description')
        email = request.data.get('email')
        stats = request.data.get([{title, description}])
        
        
        
        
Class ContactView(APIView):
    def post(self,request):
        name = request.data.post('name')
        email = request.data.post('email')
        location = request.data.post('location')
        budget = request.data.post('budget')
        subject = request.data.post('subject')
        message = request.data.post('message')
        
        
        
Class PortfolioView(APIView):
    def get( self, request ):
        id = request.data.get(id)
        title = request.data.get('title')
        description = request.data.get('description')
        image = request.data.get(image)
        category = request.data.get('category')
        link = request.data.get({link})
        
        
        
Class BlogView(APIView):
    