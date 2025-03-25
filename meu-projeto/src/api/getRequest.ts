import { api } from "./api";

export async function getRequest(id, requestId) {
  try {
    const response = await api.get(`/student/${id}/request/${requestId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao inserir request:", error);
    return { error: "Erro ao inserir request." };
  }
}