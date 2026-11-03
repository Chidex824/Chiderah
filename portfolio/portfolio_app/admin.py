from django.utils.html import format_html
from django.contrib import admin
from .models import Contact, Portfolio, Blog, Testimonial, Skill, Experience, About


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
	list_display = ('name', 'email', 'created_at')


@admin.register(Portfolio)
class PortfolioAdmin(admin.ModelAdmin):
	list_display = ('title', 'category', 'image_preview', 'created_at')
	readonly_fields = ('legacy_image_url', 'image_preview')

	@admin.display(description='Current image')
	def image_preview(self, obj):
		if not obj or not obj.image:
			return 'No image uploaded'
		return format_html(
			'<img src="{}" alt="{}" style="max-height: 100px; max-width: 180px;" />',
			obj.image.url,
			obj.title,
		)


@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
	list_display = ('title', 'slug', 'image_preview', 'created_at')
	readonly_fields = ('legacy_image_url', 'image_preview')

	@admin.display(description='Current image')
	def image_preview(self, obj):
		if not obj or not obj.image:
			return 'No image uploaded'
		return format_html(
			'<img src="{}" alt="{}" style="max-height: 100px; max-width: 180px;" />',
			obj.image.url,
			obj.title,
		)


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
	list_display = ('name', 'company', 'is_approved')
	list_filter = ('is_approved',)
	list_editable = ('is_approved',)


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
	list_display = ('name', 'level')


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
	list_display = ('role', 'company', 'start_date', 'end_date')


@admin.register(About)
class AboutAdmin(admin.ModelAdmin):
	list_display = ('name', 'title')
