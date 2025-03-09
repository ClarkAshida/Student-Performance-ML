import axios from "axios";

// Criando uma instância do Axios com configuração padrão
const api = axios.create({
  baseURL: "http://localhost:8000/api/", // Altere para a URL do seu backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Funções para requisições
export const studentService = {
  getStudentDetails: async (id: number) => {
    try {
      const response = await api.get(`alunos/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar detalhes do aluno:", error);
      throw error;
    }
  },
};

export default api;
