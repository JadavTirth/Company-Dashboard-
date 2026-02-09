import axios from "axios";

const API = axios.create({
  // This will pull from Vercel's env settings during build
  baseURL: import.meta.env.VITE_API_URL || "https://company-dashboard-backend-xa8w.onrender.com"
});

export default API;
