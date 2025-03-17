import { api } from "./api";

export async function insertReportOnStudent(id: string) {
  try {
    const response = await api.post(`/student/${id}/report`, {});
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar aluno:", error);
    return { error: "Erro ao cadastrar aluno." };
  }
}
