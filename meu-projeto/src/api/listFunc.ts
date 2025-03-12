import axios from 'axios';

const BACKEND_URL = "http://localhost:3000";

export async function listFunc() {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/student`, { // substituir student
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao gerar conteudo:", error);
        return { error: "Erro ao gerar conteudo." };
    }
}