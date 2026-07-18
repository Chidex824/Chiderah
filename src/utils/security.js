import DOMPurify from 'dompurify';

// Input validation utilities
export const validators = {
  // Email validation
  email: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
  },

  // Name validation (alphanumeric, spaces, hyphens, apostrophes)
  name: (name) => {
    const nameRegex = /^[a-zA-Z\s\-']{2,50}$/;
    return nameRegex.test(name.trim());
  },

  // Text validation (general text input)
  text: (text, maxLength = 1000) => {
    return typeof text === 'string' &&
           text.trim().length > 0 &&
           text.length <= maxLength;
  },

  // Budget validation (currency format)
  budget: (budget) => {
    const budgetRegex = /^[\d,.$£€¥₦₱₩₨₪₫₡₵₺₴₸₼₲₱₭₯₰₳₶₷₹₻₽₾₿]+$/;
    return budgetRegex.test(budget) && budget.length <= 50;
  },

  // URL validation
  url: (url) => {
    try {
      new URL(url);
      return url.length <= 2000;
    } catch {
      return false;
    }
  }
};

// Input sanitization utilities
export const sanitizers = {
  // Sanitize HTML content
  html: (content) => {
    return DOMPurify.sanitize(content, {
      ALLOWED_TAGS: [], // No HTML tags allowed
      ALLOWED_ATTR: []
    });
  },

  // Sanitize text input
  text: (text) => {
    return text
      .trim()
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/data:/gi, '') // Remove data: protocol
      .slice(0, 1000); // Limit length
  },

  // Sanitize email
  email: (email) => {
    return email
      .trim()
      .toLowerCase()
      .replace(/[<>'"]/g, '')
      .slice(0, 254);
  },

  // Sanitize name
  name: (name) => {
    return name
      .trim()
      .replace(/[<>'"]/g, '')
      .replace(/\s+/g, ' ') // Normalize spaces
      .slice(0, 50);
  }
};

// Rate limiting utility
export class RateLimiter {
  constructor(maxRequests = 5, windowMs = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.requests = [];
  }

  canMakeRequest() {
    const now = Date.now();
    // Remove old requests outside the window
    this.requests = this.requests.filter(time => now - time < this.windowMs);

    if (this.requests.length >= this.maxRequests) {
      return false;
    }

    this.requests.push(now);
    return true;
  }

  getRemainingRequests() {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < this.windowMs);
    return Math.max(0, this.maxRequests - this.requests.length);
  }

  getResetTime() {
    if (this.requests.length === 0) return 0;
    return Math.min(...this.requests) + this.windowMs;
  }
}

// Security headers utility
export const securityHeaders = {
  // Content Security Policy
  csp: {
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https: blob:",
      "connect-src 'self' http://localhost:8000 https://api.github.com",
      "frame-src 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'"
    ].join('; ')
  },

  // Other security headers
  headers: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
  }
};

// Environment validation
export const validateEnvironment = () => {
  const requiredEnvVars = [
    'VITE_API_BASE_URL',
    'VITE_REPO_NAME'
  ];

  const missingVars = requiredEnvVars.filter(varName => !import.meta.env[varName]);

  if (missingVars.length > 0) {
    console.error('Missing required environment variables:', missingVars);
    throw new Error(`Missing environment variables: ${missingVars.join(', ')}`);
  }

  // Validate API URL format
  try {
    const apiUrl = new URL(import.meta.env.VITE_API_BASE_URL);
    if (!['http:', 'https:'].includes(apiUrl.protocol)) {
      throw new Error('Invalid API URL protocol');
    }
  } catch (error) {
    console.error('Invalid VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);
    throw new Error('Invalid API base URL format');
  }
};

// Error boundary helper
export const createSecureErrorMessage = (error) => {
  // Don't expose internal error details to users
  if (process.env.NODE_ENV === 'production') {
    return 'An unexpected error occurred. Please try again later.';
  }
  return error.message || 'An error occurred';
};