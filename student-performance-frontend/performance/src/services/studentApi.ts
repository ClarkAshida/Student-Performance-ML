import { StudentRegisterData } from "@/types/students";
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
  registerStudent: async (data: StudentRegisterData) => {
    try {
      const response = await api.post("alunos/", data);
      return response.data;
    } catch (error) {
      console.error("Erro ao cadastrar aluno:", error);
      throw error;
    }
  },
  deleteStudent: async (id: number) => {
    try {
      const response = await api.delete(`alunos/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao deletar aluno:", error);
      throw error;
    }
  },
  updateStudent: async (id: number, data: StudentRegisterData) => {
    try {
      const response = await api.put(`alunos/${id}/`, data);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar aluno:", error);
      throw error;
    }
  },
};

export default api;
