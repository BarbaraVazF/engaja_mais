export async function deleteRequest(id, requestId) {
  try {
    // const response = await api.delete(`/student/${id}/request/${requestId}`);
    // return response.data;
  } catch (error) {
    console.error("Erro ao apagar solicitação:", error);
    return { error: "Erro ao apagar solicitação." };
  }
}
