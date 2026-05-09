import axios from "axios";

const aiBaseUrl = process.env.AI_SERVICE_URL || "http://localhost:8000";

export const requestDiagnosisPrediction = async (payload) => {
  const { data } = await axios.post(`${aiBaseUrl}/v1/predict`, payload);
  return data;
};

export const requestChatResponse = async (payload) => {
  const { data } = await axios.post(`${aiBaseUrl}/v1/chat`, payload);
  return data;
};
