import { api } from "./api";

export async function insertRequest(
  id: string,
  body: { categoria: string; title: string; meta?: object }
) {
  try {
    const response = await api.post(`/student/${id}/request`, body);
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar funcionalidade:", error);
    return { error: "Erro ao cadastrar funcionalidade." };
  }
}
