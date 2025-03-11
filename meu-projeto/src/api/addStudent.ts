import { api } from "./api";

export async function addStudent(studentData) {
  try {
    const response = await api.post(`/student`, studentData);
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar aluno:", error);
    return { error: "Erro ao cadastrar aluno." };
  }
}
