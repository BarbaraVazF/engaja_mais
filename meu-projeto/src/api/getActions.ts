import { api } from "./api";

export async function getActions(id: string) {
  try {
    const response = await api.get(`/student/${id}/actions`);
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar aluno:", error);
    return { error: "Erro ao cadastrar aluno." };
  }
}
