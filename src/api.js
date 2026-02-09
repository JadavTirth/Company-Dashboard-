import axios from "axios";

const API = axios.create({
 // baseURL: import.meta.env.VITE_API_URL
  baseURL: "https://company-dashboard-backend-xa8w.onrender.com"
});

export default API;
