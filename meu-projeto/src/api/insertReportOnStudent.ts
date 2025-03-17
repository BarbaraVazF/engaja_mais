import { api } from "./api";

export async function insertReportOnStudent(id: string, formData: typeof FormData) {
  
  try {
    const config = {     
      headers: { 'content-type': 'multipart/form-data' }
    } 
    const response = await api.post(`/student/${id}/report`, formData, config);
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar aluno:", error);
    return { error: "Erro ao cadastrar aluno." };
  }
}
