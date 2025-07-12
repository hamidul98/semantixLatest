// API utility functions for WordPress REST API integration

const getApiUrl = () => {
  // Check if we're in WordPress admin context
  if (window.semantixData && window.semantixData.apiUrl) {
    return window.semantixData.apiUrl;
  }
  // Fallback for development
  return '/wp-json/semantix/v1/';
};

const getNonce = () => {
  if (window.semantixData && window.semantixData.nonce) {
    return window.semantixData.nonce;
  }
  return '';
};

export const apiRequest = async (endpoint, options = {}) => {
  const url = getApiUrl() + endpoint;
  const nonce = getNonce();
  
  const defaultOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-WP-Nonce': nonce,
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, mergedOptions);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

export const getWordPressData = (key) => {
  if (window.semantixData && window.semantixData[key]) {
    return window.semantixData[key];
  }
  return null;
};