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


class AboutView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        about = About.objects.order_by('-id').first()
        if about:
            serializer = AboutSerializer(about)
            return Response(serializer.data, status=status.HTTP_200_OK)
        # fallback
        return Response({"name": "Your Name", "title": "Your Title"}, status=status.HTTP_200_OK)


class ContactView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PortfolioListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        projects = Portfolio.objects.all().order_by('-created_at')
        serializer = PortfolioSerializer(projects, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class BlogListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        posts = Blog.objects.all().order_by('-created_at')
        serializer = BlogSerializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class TestimonialsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        testimonials = Testimonial.objects.all()
        serializer = TestimonialSerializer(testimonials, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class SkillsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        skills = Skill.objects.all()
        serializer = SkillSerializer(skills, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ExperienceView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        experience = Experience.objects.all().order_by('-start_date')
        serializer = ExperienceSerializer(experience, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    