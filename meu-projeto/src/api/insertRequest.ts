import { api } from "./api";

export async function insertReportOnStudent(id: string, body:{type:string,title:string,meta?:object}) {
  
  try {
    const config = {     
    } 
    const response = await api.post(`/student/${id}/request`, body, config);
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar funcionalidade:", error);
    return { error: "Erro ao cadastrar funcionalidade." };
  }
}
