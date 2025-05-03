import axios from "axios";

const API = axios.create({
  baseURL: "https://ecommerce-website-b640.onrender.com/api/v1",
});

export default API;
