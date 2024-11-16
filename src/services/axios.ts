import axios from "axios";

const API_URL = "http://localhost:3000/api"; // Адрес backend-сервера

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Берём токен из localStorage

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
