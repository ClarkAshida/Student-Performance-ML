/* eslint-disable react/react-in-jsx-scope */
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  ClassRoom,
  ClassRoomDetails,
  ClassRoomRegisterData,
  ClassRoomStudents,
} from "../types/classRooms";
import {
  StudentData,
  StudentRegisterData,
  StudentResponse,
} from "@/types/students";
import { classRoomService } from "../services/classRoomApi";
import { studentService } from "@/services/studentApi";

interface ApiContextType {
  classRooms: ClassRoom[];
  setClassRooms: (classRooms: ClassRoom[]) => void;
  fetchClassRoomDetails: (id: number) => Promise<ClassRoomDetails | null>;
  fetchClassRoomStudents: (id: number) => Promise<ClassRoomStudents[] | null>;
  registerClassRoom: (data: ClassRoomRegisterData) => Promise<ClassRoom>;
  deleteClassRoom: (id: number) => Promise<ClassRoom>;
  fetchStudentDetails: (id: number) => Promise<StudentData | null>;
  registerStudent: (data: StudentRegisterData) => Promise<StudentResponse>;
  deleteStudent: (id: number) => Promise<StudentData>;
  updateStudent: (
    id: number,
    data: StudentRegisterData
  ) => Promise<StudentData>;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider = ({ children }: { children: ReactNode }) => {
  const [classRooms, setClassRooms] = useState<ClassRoom[]>([]);

  const fetchClassRooms = async () => {
    try {
      const data = await classRoomService.getClassRooms();
      setClassRooms(data);
    } catch (error) {
      console.error("Erro ao buscar salas:", error);
    }
  };

  const fetchClassRoomDetails = async (
    id: number
  ): Promise<ClassRoomDetails | null> => {
    try {
      return await classRoomService.getClassRoomDetails(id);
    } catch (error) {
      console.error("Erro ao buscar detalhes da sala:", error);
      return null;
    }
  };

  const fetchClassRoomStudents = async (
    id: number
  ): Promise<ClassRoomStudents[] | null> => {
    try {
      return await classRoomService.getClassRoomStudents(id);
    } catch (error) {
      console.error("Erro ao buscar alunos da sala:", error);
      return null;
    }
  };

  const registerClassRoom = async (data: ClassRoomRegisterData) => {
    try {
      const response = await classRoomService.registerClassRoom(data);
      return response;
    } catch (error) {
      console.error("Erro ao cadastrar sala de aula:", error);
      throw error;
    }
  };

  const deleteClassRoom = async (id: number) => {
    try {
      const response = await classRoomService.deleteClassRoom(id);
      console.log("Sala deletada com sucesso:", response);
      return response;
    } catch (error) {
      console.error("Erro ao deletar sala de aula:", error);
      throw error;
    }
  };

  //----------------- Funções para alunos -----------------

  const fetchStudentDetails = async (
    id: number
  ): Promise<StudentData | null> => {
    try {
      return await studentService.getStudentDetails(id);
    } catch (error) {
      console.error("Erro ao buscar detalhes do aluno:", error);
      return null;
    }
  };

  const registerStudent = async (data: StudentRegisterData) => {
    try {
      const response = await studentService.registerStudent(data);
      return response;
    } catch (error) {
      console.error("Erro ao cadastrar aluno:", error);
      throw error;
    }
  };

  const deleteStudent = async (id: number) => {
    try {
      const response = await studentService.deleteStudent(id);
      console.log("Aluno deletado com sucesso:", response);
      return response;
    } catch (error) {
      console.error("Erro ao deletar aluno:", error);
      throw error;
    }
  };

  const updateStudent = async (id: number, data: StudentRegisterData) => {
    try {
      const response = await studentService.updateStudent(id, data);
      return response;
    } catch (error) {
      console.error("Erro ao atualizar aluno:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchClassRooms();
  }, []);

  const value: ApiContextType = {
    classRooms,
    setClassRooms,
    fetchClassRoomDetails,
    fetchClassRoomStudents,
    registerClassRoom,
    deleteClassRoom,
    fetchStudentDetails,
    registerStudent,
    deleteStudent,
    updateStudent,
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};
