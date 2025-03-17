import { api } from "./api";

export async function getStudent(id:string) {
  try {
    const response = await api.get(`/student/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar aluno:", error);
    return { error: "Erro ao cadastrar aluno." };
  }
}