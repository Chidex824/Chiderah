from rest_framework import serializers
from .models import Contact, Portfolio, Blog, Testimonial, Skill, Experience, About


class ContactSerializer(serializers.ModelSerializer):
	class Meta:
		model = Contact
		fields = '__all__'


class PortfolioSerializer(serializers.ModelSerializer):
	class Meta:
		model = Portfolio
		fields = '__all__'


class BlogSerializer(serializers.ModelSerializer):
	class Meta:
		model = Blog
		fields = '__all__'


class TestimonialSerializer(serializers.ModelSerializer):
	class Meta:
		model = Testimonial
		fields = '__all__'


class SkillSerializer(serializers.ModelSerializer):
	class Meta:
		model = Skill
		fields = '__all__'


class ExperienceSerializer(serializers.ModelSerializer):
	class Meta:
		model = Experience
		fields = '__all__'


class AboutSerializer(serializers.ModelSerializer):
	class Meta:
		model = About
		fields = '__all__'