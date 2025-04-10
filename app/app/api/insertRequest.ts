export async function insertRequest(id, requestData) {
  try {
    // const response = await api.post(`/student/${id}/request`, requestData);
    // return response.data;
  } catch (error) {
    console.error("Erro ao inserir request:", error);
    return { error: "Erro ao inserir request." };
  }
}
