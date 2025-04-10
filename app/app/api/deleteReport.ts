export async function deleteReport(id: string, id_relatorio: string) {
  try {
    // const response = await api.delete(`/student/${id}/report/${id_relatorio}`);
    // return response.data;
  } catch (error) {
    console.error("Erro ao apagar relatório:", error);
    return { error: "Erro ao apagar relatório." };
  }
}
