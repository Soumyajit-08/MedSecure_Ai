import { apiClient } from "./api-client";

export const dashboardApi = {
  getStats: () => apiClient.get("/dashboard/stats")
};
