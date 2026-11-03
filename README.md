# chiderah

#### Preview

## 🔒 Security Features

This application implements comprehensive security measures to protect against common web vulnerabilities:

### Frontend Security
- **Content Security Policy (CSP)**: Prevents XSS attacks by restricting resource loading
- **Input Validation & Sanitization**: All user inputs are validated and sanitized using DOMPurify
- **Rate Limiting**: API requests are rate-limited to prevent abuse
- **Error Boundary**: Secure error handling that doesn't expose sensitive information
- **Security Headers**: X-Frame-Options, X-Content-Type-Options, X-XSS-Protection, etc.
- **Environment Validation**: Ensures required environment variables are present
- **Build Security**: Console logs removed in production, source maps disabled

### API Security
- **Request Validation**: All API requests are validated before sending
- **Error Handling**: Secure error messages that don't leak sensitive data
- **CSRF Protection**: X-CSRFToken header included for Django compatibility
- **Request Logging**: Development-mode request logging for debugging

### Development Tools
- **Security Audit Script**: Automated security checks (`npm run security-audit`)
- **Vulnerability Scanning**: Regular dependency vulnerability checks
- **Secure Build Process**: Production builds remove debug information

## Backend Integration

This React frontend is designed to work with a Django REST API backend. The application includes full API integration for dynamic content management.

### Required Django Backend Endpoints

Your Django backend should provide the following API endpoints:

#### Contact Form
- `POST /api/contact/` - Submit contact form data
- Expected payload: `{name, email, location, budget, subject, message}`

#### Portfolio/Projects
- `GET /api/portfolios/` - Fetch all portfolio projects
- Expected response: Array of project objects with `{id, title, description, image, category, link}`

#### Blog Posts
- `GET /api/blogs/` - Fetch all blog posts
- Expected response: Array of blog objects with `{id, title, content, image, created_at, slug, comments_count}`

#### Testimonials
- `GET /api/testimonials/` - Fetch all testimonials
- Expected response: Array of testimonial objects with `{id, name, message, designation, company, image}`

#### About/Introduction Data
- `GET /api/about/` - Fetch about section data
- Expected response: `{name, title, description, email, stats: [{title, description}]}`

#### Skills
- `GET /api/skills/` - Fetch skills/technologies
- Expected response: Array of skill objects

#### Experience
- `GET /api/experience/` - Fetch work experience
- Expected response: Array of experience objects

### Environment Configuration

Create a `.env.local` file in the repository root for the Vite frontend:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

### Connect Django to Neon PostgreSQL

1. Create a Neon project and database, then copy its PostgreSQL connection string from the Neon dashboard. Use the pooled connection string for a serverless deployment, and keep its `sslmode=require` parameter.
2. In the Vercel project's **Settings → Environment Variables**, set `DATABASE_URL` to the Neon connection string, `VITE_API_BASE_URL` to `/api`, and `DJANGO_SECRET_KEY` to a newly generated secret. Generate one with `python -c "import secrets; print(secrets.token_urlsafe(50))"`. Set `DJANGO_ALLOWED_HOSTS` to any custom domains, comma-separated; Vercel's deployment hostname is added automatically. Django defaults to `DEBUG=False` on Vercel. Add these variables to the environments you deploy (for example, Production), then redeploy. Keep secrets out of source control. The Vercel rewrites send `/api/` requests to Django and other requests to the frontend.
3. Apply Django migrations to create the tables. In PowerShell, from the repository root:

   ```powershell
   $env:DATABASE_URL = "paste-your-neon-connection-string-here"
   python portfolio\manage.py migrate
   ```

   The command uses the same database URL as the deployed app. Set `DATABASE_URL` in your local shell before running the migration; without it, Django continues to use the local SQLite database.

Migrations create the schema but do not copy existing records from SQLite to Neon.

### CORS Configuration

Ensure your Django backend has CORS configured to allow requests from your React development server:

```python
# settings.py
INSTALLED_APPS = [
    # ... other apps
    'corsheaders',
]

MIDDLEWARE = [
    # ... other middleware
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
]

# Allow all origins for development (restrict in production)
CORS_ALLOW_ALL_ORIGINS = True

# Or specify allowed origins
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:8000",
]
```

## Getting Started

1. **Clone Repository**

```
git clone https://github.com/Chidex824/chiderah_portfolio.git
```

2. **Install Dependencies**

```
npm i
```

3. **Configure Environment**

Create `.env.local` with your API base URL:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

4. **Run Security Audit** (Optional but recommended)

```bash
npm run security-audit
```

5. **Start Django Backend**

Make sure your Django backend is running on the configured port (default: 8000).

5. **Run the development server:**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run deploy` - Build and deploy to GitHub Pages
- `npm run lint` - Run ESLint
- `npm run security-audit` - Run security audit checks

## Security Best Practices

- **Responsive Design**: Works seamlessly across all devices
- **Dynamic Content**: All content is fetched from Django backend
- **Contact Form**: Integrated contact form with backend submission
- **Portfolio Showcase**: Dynamic portfolio projects display
- **Blog Integration**: Fetch and display blog posts
- **Testimonials**: Dynamic testimonials from backend
- **Loading States**: Smooth loading indicators throughout the app
- **Error Handling**: Graceful fallbacks when API is unavailable

## Security Best Practices

- **Regular Audits**: Run `npm run security-audit` regularly
- **Dependency Updates**: Keep packages updated with `npm audit fix`
- **Environment Variables**: Never commit `.env` files to version control
- **HTTPS**: Always use HTTPS in production
- **Input Validation**: All user inputs are validated on both frontend and backend
- **Rate Limiting**: API endpoints are protected against abuse
- **Error Handling**: Errors don't expose sensitive information
- **CSP**: Content Security Policy prevents XSS attacks

## Author

```
Developed by Ugwu Chiderah.
```

## License

- Design and Code is Copyright &copy; Ugwu Chiderah
- Licensed cover under [MIT]
- Developed by Ugwu Chiderah
"# Chiderah_Portfolio" 
