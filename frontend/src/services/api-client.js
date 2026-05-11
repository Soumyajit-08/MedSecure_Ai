import axios from "axios";

const LOCAL_API_BASE_URL = "http://localhost:5000/api/v1";
const PRODUCTION_API_BASE_URL = "https://medsecure-ai-1.onrender.com/api/v1";

const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL;
const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? LOCAL_API_BASE_URL
    : configuredApiUrl || PRODUCTION_API_BASE_URL;

export const apiClient = axios.create({
  baseURL: API_BASE_URL
});

apiClient.interceptors.request.use((config) => {
  if (typeof FormData !== "undefined" && config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  } else {
    config.headers["Content-Type"] = "application/json";
  }

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("medsecure_access_token");
    if (token && token !== "null" && token !== "undefined") {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});
