// API Configuration
// This handles different API URLs for development and production

const getApiUrl = () => {
    // In production (Vercel), use the environment variable
    // In development, use the proxy (which is handled by Vite)
    if (import.meta.env.PROD) {
        return import.meta.env.VITE_API_URL || 'https://your-backend-url.com';
    }
    // In development, return empty string to use the proxy
    return '';
};

export const API_URL = getApiUrl();
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

// Helper function to make API calls with proper URL
export const apiCall = async (endpoint, options = {}) => {
    const url = `${API_URL}${endpoint}`;
    const response = await fetch(url, options);
    return response;
};
