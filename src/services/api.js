import axios from 'axios';
import { RateLimiter, validateEnvironment, createSecureErrorMessage } from '../utils/security';

// Validate environment on module load
validateEnvironment();

// Create rate limiter instances for different endpoints
const contactRateLimiter = new RateLimiter(3, 60000); // 3 requests per minute for contact
const generalRateLimiter = new RateLimiter(10, 60000); // 10 requests per minute for general API calls

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest', // Helps prevent CSRF
  },
});

// Request interceptor for adding auth tokens and security headers
api.interceptors.request.use(
  (config) => {
    // Check rate limiting
    if (config.url.includes('/contact/')) {
      if (!contactRateLimiter.canMakeRequest()) {
        throw new Error('Too many contact form submissions. Please wait before trying again.');
      }
    } else {
      if (!generalRateLimiter.canMakeRequest()) {
        throw new Error('Too many requests. Please wait before trying again.');
      }
    }

    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add CSRF token if available (for Django)
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]');
    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken.value;
    }

    // Add timestamp for request tracking
    config.metadata = { startTime: Date.now() };

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors and logging
api.interceptors.response.use(
  (response) => {
    // Log successful requests in development
    if (process.env.NODE_ENV === 'development') {
      const duration = Date.now() - response.config.metadata.startTime;
      console.log(`API Request: ${response.config.method.toUpperCase()} ${response.config.url} - ${response.status} (${duration}ms)`);
    }
    return response;
  },
  (error) => {
    // Handle different error types
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      switch (status) {
        case 400:
          throw new Error(data.detail || 'Invalid request data');
        case 401:
          // Clear invalid token
          localStorage.removeItem('authToken');
          throw new Error('Authentication required');
        case 403:
          throw new Error('Access forbidden');
        case 404:
          throw new Error('Requested resource not found');
        case 429:
          throw new Error('Too many requests. Please wait and try again.');
        case 500:
          throw new Error('Server error. Please try again later.');
        default:
          throw new Error(data.detail || `Request failed with status ${status}`);
      }
    } else if (error.request) {
      // Network error
      throw new Error('Network error. Please check your connection.');
    } else {
      // Other error
      throw new Error(createSecureErrorMessage(error));
    }
  }
);

// API endpoints
export const apiService = {
  // Contact form submission
  submitContactForm: async (formData) => {
    try {
      const response = await api.post('/contact/', formData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Portfolio/Projects
  getProjects: async () => {
    try {
      const response = await api.get('/portfolios/');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getProject: async (id) => {
    try {
      const response = await api.get(`/portfolios/${id}/`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Blog posts
  getBlogPosts: async () => {
    try {
      const response = await api.get('/blogs/');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getBlogPost: async (id) => {
    try {
      const response = await api.get(`/blogs/${id}/`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Testimonials
  getTestimonials: async () => {
    try {
      const response = await api.get('/testimonials/');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Skills/Technologies
  getSkills: async () => {
    try {
      const response = await api.get('/skills/');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Experience/Work History
  getExperience: async () => {
    try {
      const response = await api.get('/experience/');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // About/Introduction data
  getAbout: async () => {
    try {
      const response = await api.get('/about/');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default api;