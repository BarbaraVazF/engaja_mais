import axios from 'axios';

const BACKEND_URL = "http://localhost:3000";

export async function addStudent(studentData) {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/student`, studentData, {
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