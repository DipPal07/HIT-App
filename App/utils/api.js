// api.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import URL from '../assets/constant/url';

// Store token after login
const storeToken = async token => {
  try {
    await AsyncStorage.setItem('token', token);
  } catch (error) {
    console.error('Error saving token', error);
  }
};

// Remove token on logout
const logout = async () => {
  try {
    await AsyncStorage.removeItem('token');
    // You can trigger navigation here if you pass a navigation prop or use a global nav method
  } catch (error) {
    console.error('Error removing token', error);
  }
};

// Create Axios instance
const api = axios.create({
  baseURL: URL.baseUri, // replace with actual backend URL
});

// Attach token to all requests
api.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 Unauthorized globally
api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('token');
      // Optionally: redirect to login screen using a navigation method
    }
    return Promise.reject(error);
  },
);

export default api;
export {storeToken, logout};
