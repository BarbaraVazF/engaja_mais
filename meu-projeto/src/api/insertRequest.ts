import { api } from "./api";

export async function insertRequest(id:string, id_request:string) {
  try {
    const response = await api.get(`/student/${id}/request/${id_request}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao visualizar request:", error);
    return { error: "Erro ao visualizar request." };
  }
}