import axios from 'axios';

const BACKEND_URL = "http://localhost:3000";

export async function listStudent() {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/student`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao cadastrar aluno:", error);
        return { error: "Erro ao cadastrar aluno." };
    }
}