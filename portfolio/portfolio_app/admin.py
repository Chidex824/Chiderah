from django.contrib import admin
from .models import Contact, Portfolio, Blog, Testimonial, Skill, Experience, About


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
	list_display = ('name', 'email', 'created_at')


@admin.register(Portfolio)
class PortfolioAdmin(admin.ModelAdmin):
	list_display = ('title', 'category', 'created_at')
	readonly_fields = ('legacy_image_url',)


@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
	list_display = ('title', 'slug', 'created_at')


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
	list_display = ('name', 'company')


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
	list_display = ('name', 'level')


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
	list_display = ('role', 'company', 'start_date', 'end_date')


@admin.register(About)
class AboutAdmin(admin.ModelAdmin):
	list_display = ('name', 'title')
