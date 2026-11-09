from django.urls import path
from . import views

urlpatterns = [
	path('contact/', views.ContactView.as_view(), name='api-contact'),
	path('chat/', views.ChatSupportView.as_view(), name='api-chat'),
	path('portfolios/', views.PortfolioListView.as_view(), name='api-portfolios'),
	path('blogs/', views.BlogListView.as_view(), name='api-blogs'),
	path('testimonials/', views.TestimonialsView.as_view(), name='api-testimonials'),
	path('about/', views.AboutView.as_view(), name='api-about'),
	path('skills/', views.SkillsView.as_view(), name='api-skills'),
	path('experience/', views.ExperienceView.as_view(), name='api-experience'),
]