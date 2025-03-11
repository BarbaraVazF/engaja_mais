import { api } from "./api";

export async function listStudent() {
  try {
    const response = await api.get(`/student`);
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar aluno:", error);
    return { error: "Erro ao cadastrar aluno." };
  }
}
