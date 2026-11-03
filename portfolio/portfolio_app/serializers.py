from rest_framework import serializers
from .models import Contact, Portfolio, Blog, Testimonial, Skill, Experience, About


class ContactSerializer(serializers.ModelSerializer):
	privacy_consent = serializers.BooleanField(required=True)

	class Meta:
		model = Contact
		fields = '__all__'

	def validate_privacy_consent(self, value):
		if not value:
			raise serializers.ValidationError(
				'Consent to the privacy policy is required to send this message.'
			)
		return value


class PortfolioSerializer(serializers.ModelSerializer):
	image = serializers.SerializerMethodField()

	class Meta:
		model = Portfolio
		fields = ('id', 'title', 'description', 'image', 'category', 'link', 'created_at')

	def get_image(self, instance):
		image_name = instance.image.name or ''
		if image_name.lower().startswith(('http://', 'https://')):
			return image_name
		if image_name:
			image_url = instance.image.url
			request = self.context.get('request')
			return request.build_absolute_uri(image_url) if request else image_url
		return instance.legacy_image_url or ''


class BlogSerializer(serializers.ModelSerializer):
	image = serializers.SerializerMethodField()

	class Meta:
		model = Blog
		fields = (
			'id',
			'title',
			'content',
			'image',
			'created_at',
			'slug',
			'comments_count',
		)

	def get_image(self, instance):
		image_name = instance.image.name or ''
		if image_name.lower().startswith(('http://', 'https://')):
			return image_name
		if image_name:
			image_url = instance.image.url
			request = self.context.get('request')
			return request.build_absolute_uri(image_url) if request else image_url
		return instance.legacy_image_url or ''


class TestimonialSerializer(serializers.ModelSerializer):
	class Meta:
		model = Testimonial
		fields = (
			'id',
			'name',
			'message',
			'designation',
			'company',
			'image',
			'is_approved',
		)
		read_only_fields = ('is_approved', 'publication_consent')


class TestimonialSubmissionSerializer(serializers.ModelSerializer):
	message = serializers.CharField(max_length=2000, trim_whitespace=True)
	publication_consent = serializers.BooleanField(required=True)

	class Meta:
		model = Testimonial
		fields = (
			'name',
			'message',
			'designation',
			'company',
			'publication_consent',
		)

	def validate_publication_consent(self, value):
		if not value:
			raise serializers.ValidationError(
				'Consent to publish this review is required.'
			)
		return value


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