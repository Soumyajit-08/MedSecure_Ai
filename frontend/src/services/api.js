import { apiClient } from "./api-client";

export const authApi = {
  signup: (payload) => apiClient.post("/auth/signup", payload),
  verifyEmail: (payload) => apiClient.post("/auth/verify-email", payload),
  login: (payload) => apiClient.post("/auth/login", payload),
  me: () => apiClient.get("/users/me")
};

export const predictionsApi = {
  create: (payload) => apiClient.post("/predictions", payload),
  list: () => apiClient.get("/predictions")
};

export const chatbotApi = {
  chat: (payload) => apiClient.post("/chatbot", payload),
  getHistory: () => apiClient.get("/chatbot/history"),
  deleteHistoryItem: (messageId) => apiClient.delete(`/chatbot/history/${messageId}`),
  clearHistory: () => apiClient.delete("/chatbot/history")
};

export const illnessApi = {
  search: (payload) => apiClient.post("/illness/search", payload),
  dataset: () => apiClient.get("/illness/dataset")
};

export const appointmentsApi = {
  create: (payload) => apiClient.post("/appointments", payload),
  list: () => apiClient.get("/appointments")
};

export const reportsApi = {
  list: () => apiClient.get("/reports")
};

export const visionApi = {
  analyze: (formData) => apiClient.post("/diagnosis/vision", formData)
};

export const analyticsApi = {
  admin: () => apiClient.get("/analytics/admin")
};

export const dashboardApi = {
  getStats: () => apiClient.get("/dashboard/stats")
};
