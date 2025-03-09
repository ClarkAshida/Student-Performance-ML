import axios from "axios";

// Criando uma instância do Axios com configuração padrão
const api = axios.create({
  baseURL: "http://localhost:8000/api/", // Altere para a URL do seu backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Funções para requisições
export const classRoomService = {
  getClassRooms: async () => {
    try {
      const response = await api.get("turmas");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar salas de aula:", error);
      throw error;
    }
  },
  getClassRoomDetails: async (id: number) => {
    try {
      const response = await api.get(`turmas/${id}/detalhes`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar detalhes da sala de aula:", error);
      throw error;
    }
  },
  getClassRoomStudents: async (id: number) => {
    try {
      const response = await api.get(`turmas/${id}/alunos`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar alunos da sala de aula:", error);
      throw error;
    }
  },
};

export default api;
