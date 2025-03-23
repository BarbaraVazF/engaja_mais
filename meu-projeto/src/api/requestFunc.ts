import axios from 'axios';

const BACKEND_URL = "http://localhost:3000";

export async function requestFunc(content) {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/request`, content, { 
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