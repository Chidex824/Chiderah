from django.test import TestCase
from django.core.files.uploadedfile import SimpleUploadedFile
from .models import Portfolio
from .serializers import PortfolioSerializer


class PortfolioImageUploadTests(TestCase):
	def test_portfolio_accepts_uploaded_image(self):
		image = SimpleUploadedFile(
			'portfolio.png',
			bytes.fromhex(
				'89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c489'
				'0000000b49444154789c636000020000050001a5f645400000000049454e44ae426082'
			),
			content_type='image/png',
		)
		portfolio = Portfolio(title='Uploaded project', image=image)

		portfolio.full_clean()

		self.assertEqual(portfolio.image.name, 'portfolio.png')

	def test_serializer_keeps_existing_external_image_url(self):
		image_url = 'https://example.com/portfolio.png'
		portfolio = Portfolio(
			title='Existing project',
			legacy_image_url=image_url,
		)

		self.assertEqual(
			PortfolioSerializer(portfolio).data['image'],
			image_url,
		)
