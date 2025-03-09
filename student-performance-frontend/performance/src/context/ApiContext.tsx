import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  ClassRoom,
  ClassRoomDetails,
  ClassRoomStudents,
} from "../types/classRooms";
import { StudentData } from "@/types/students";
import { classRoomService } from "../services/classRoomApi";
import { studentService } from "@/services/studentApi";

interface ApiContextType {
  classRooms: ClassRoom[];
  setClassRooms: (classRooms: ClassRoom[]) => void;
  fetchClassRoomDetails: (id: number) => Promise<ClassRoomDetails | null>;
  fetchClassRoomStudents: (id: number) => Promise<ClassRoomStudents[] | null>;
  fetchStudentDetails: (id: number) => Promise<StudentData | null>;
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

  useEffect(() => {
    fetchClassRooms();
  }, []);

  const value: ApiContextType = {
    classRooms,
    setClassRooms,
    fetchClassRoomDetails,
    fetchClassRoomStudents,
    fetchStudentDetails,
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
