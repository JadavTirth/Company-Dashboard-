import axios from "axios";
// require("dotenv").config();

const API = axios.create({
  // This will pull from Vercel's env settings during build
  baseURL:  "https://company-dashboard-backend-xa8w.onrender.com"
  // || import.meta.env.VITE_API_URL 
});

export default API;
