// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://ecommerce-website-b640.onrender.com/api/v1",
});

API.interceptors.request.use((config) => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  if (auth?.token) {
    config.headers.Authorization = `Bearer ${auth.token}`;
  }
  return config;
});

export default API;
