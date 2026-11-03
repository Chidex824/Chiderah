from django.db import models
import uuid


# Create your models here.


class Contact(models.Model):
	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	name = models.CharField(max_length=200)
	email = models.EmailField()
	location = models.CharField(max_length=200, blank=True)
	budget = models.CharField(max_length=100, blank=True)
	subject = models.CharField(max_length=300, blank=True)
	message = models.TextField()
	privacy_consent = models.BooleanField(default=False)
	created_at = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return f"Contact: {self.name} <{self.email}>"


class Portfolio(models.Model):
	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	title = models.CharField(max_length=255)
	description = models.TextField(blank=True)
	image = models.ImageField(upload_to='portfolio/', blank=True, max_length=2048)
	legacy_image_url = models.URLField(blank=True, editable=False, max_length=2048)
	category = models.CharField(max_length=100, blank=True)
	link = models.URLField(blank=True)
	created_at = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.title


class Blog(models.Model):
	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	title = models.CharField(max_length=255)
	content = models.TextField()
	image = models.ImageField(upload_to='blogs/', blank=True, max_length=2048)
	legacy_image_url = models.URLField(blank=True, editable=False, max_length=2048)
	created_at = models.DateTimeField(auto_now_add=True)
	slug = models.SlugField(max_length=255, unique=True)
	comments_count = models.IntegerField(default=0)

	def __str__(self):
		return self.title


class Testimonial(models.Model):
	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	name = models.CharField(max_length=200)
	message = models.TextField()
	designation = models.CharField(max_length=200, blank=True)
	company = models.CharField(max_length=200, blank=True)
	image = models.URLField(blank=True)
	publication_consent = models.BooleanField(default=False)
	is_approved = models.BooleanField(default=False)

	def __str__(self):
		return f"{self.name} - {self.company}"


class Skill(models.Model):
	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	name = models.CharField(max_length=200)
	level = models.CharField(max_length=50, blank=True)

	def __str__(self):
		return self.name


class Experience(models.Model):
	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	role = models.CharField(max_length=200)
	company = models.CharField(max_length=200)
	start_date = models.DateField()
	end_date = models.DateField(null=True, blank=True)
	description = models.TextField(blank=True)
	is_current = models.BooleanField(default=False)

	def __str__(self):
		return f"{self.role} @ {self.company}"


class About(models.Model):
	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	name = models.CharField(max_length=200)
	title = models.CharField(max_length=200, blank=True)
	description = models.TextField(blank=True)
	email = models.EmailField(blank=True)
	stats = models.JSONField(default=list, blank=True)

	def __str__(self):
		return f"About: {self.name}"
