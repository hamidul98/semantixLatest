// API utility functions for WordPress REST API integration

const getApiUrl = (): string => {
  if ((window as any).semantixData && (window as any).semantixData.apiUrl) {
    return (window as any).semantixData.apiUrl as string;
  }
  return '/wp-json/semantix/v1/';
};

const getNonce = (): string => {
  if ((window as any).semantixData && (window as any).semantixData.nonce) {
    return (window as any).semantixData.nonce as string;
  }
  return '';
};

export const apiRequest = async (endpoint: string, options: RequestInit = {}): Promise<any> => {
  const url = getApiUrl() + endpoint;
  const nonce = getNonce();

  const defaultOptions: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-WP-Nonce': nonce,
    },
  };

  const mergedOptions: RequestInit = {
    ...defaultOptions,
    ...options,
    headers: {
      ...(defaultOptions.headers as Record<string, string>),
      ...(options.headers as Record<string, string> | undefined),
    },
  };

  const response = await fetch(url, mergedOptions);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export const getWordPressData = (key: string): any => {
  if ((window as any).semantixData && (window as any).semantixData[key]) {
    return (window as any).semantixData[key];
  }
  return null;
};
