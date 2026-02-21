import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: async (name, email, password) => {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;
  },
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
};

export const cropAPI = {
  getAllCrops: async () => {
    const response = await api.get('/crops');
    return response.data;
  },
  createCrop: async (cropData) => {
    const response = await api.post('/crops', cropData);
    return response.data;
  },
  getCropWithWeather: async (city) => {
    const response = await api.get(`/crops/with-weather?city=${city}`);
    return response.data;
  },
};

export const weatherAPI = {
  getWeather: async (city) => {
    const response = await api.get(`/weather?city=${city}`);
    return response.data;
  },
};

export default api;
