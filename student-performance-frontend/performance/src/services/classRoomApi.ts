import { ClassRoomRegisterData } from "@/types/classRooms";
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
  registerClassRoom: async (data: ClassRoomRegisterData) => {
    try {
      const response = await api.post("turmas/", data);
      return response.data;
    } catch (error) {
      console.error("Erro ao cadastrar sala de aula:", error);
      throw error;
    }
  },
  deleteClassRoom: async (id: number) => {
    try {
      const response = await api.delete(`turmas/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao deletar sala de aula:", error);
      throw error;
    }
  },
  updateClassRoom: async (id: number, data: ClassRoomRegisterData) => {
    try {
      const response = await api.put(`turmas/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar sala de aula:", error);
      throw error;
    }
  },
};

export default api;
