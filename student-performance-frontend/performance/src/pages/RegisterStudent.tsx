import React, { useState } from "react";
import { useApi } from "../context/ApiContext";
import { StudentRegisterData } from "@/types/students";
import axios from "axios";

const RegisterStudent: React.FC = () => {
  const { registerStudent } = useApi(); // Pegando a função do contexto

  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState<StudentRegisterData>({
    name: "",
    age: 0,
    gender: "M",
    learning_desability: false,
    classes: 1,
    parental_involvement: "Low",
    access_to_resources: "Low",
    motivation_level: "Low",
    family_income: "Low",
    teacher_quality: "Low",
    peer_influence: "Neutral",
    parental_education: "High School",
    distance_from_home: "Near",
    hours_studied: 0,
    attendance: 0,
    extracurricular_activities: 0,
    sleep_hours: 0,
    previous_scores: 0,
    internet_access: false,
    tutoring_sessions: 0,
    school_type: "Public",
    physical_activity: 0,
  });

  // Função para atualizar os valores do formulário
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    // Converte para número se necessário
    const newValue =
      type === "number"
        ? parseFloat(value)
        : type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  // Função para enviar o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerStudent(formData);
      alert("Estudante cadastrado com sucesso!");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessages = Object.entries(error.response.data)
          .map(
            ([field, messages]) =>
              `${field}: ${(messages as string[]).join(", ")}`
          )
          .join("\n");
        alert(`Erro ao cadastrar estudante:\n${errorMessages}`);
      } else {
        alert("Erro ao cadastrar estudante.");
      }
      console.error("Erro ao cadastrar estudante:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Register Student</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nome */}
        <div>
          <label className="block font-semibold">Nome:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Idade */}
        <div>
          <label className="block font-semibold">Idade:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Gênero */}
        <div>
          <label className="block font-semibold">Gênero:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
          </select>
        </div>

        {/* Deficiência de aprendizado */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="learning_desability"
            checked={formData.learning_desability}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="font-semibold">
            Possui dificuldade de aprendizado?
          </label>
        </div>

        {/* Escolaridade dos pais */}
        <div>
          <label className="block font-semibold">Escolaridade dos Pais:</label>
          <select
            name="parental_education"
            value={formData.parental_education}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="None">Nenhuma</option>
            <option value="High School">Ensino Médio</option>
            <option value="College">Faculdade</option>
            <option value="Graduate">Pós-graduação</option>
          </select>
        </div>

        {/* Acesso à Internet */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="internet_access"
            checked={formData.internet_access}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="font-semibold">Possui acesso à Internet?</label>
        </div>

        {/* Participação dos Pais */}
        <div>
          <label className="block font-semibold">Participação dos Pais:</label>
          <select
            name="parental_involvement"
            value={formData.parental_involvement}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="Low">Baixa</option>
            <option value="Medium">Média</option>
            <option value="High">Alta</option>
          </select>
        </div>

        {/* Qualidade do Professor */}
        <div>
          <label className="block font-semibold">Qualidade do Professor:</label>
          <select
            name="teacher_quality"
            value={formData.teacher_quality}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="Low">Baixa</option>
            <option value="Medium">Média</option>
            <option value="High">Alta</option>
          </select>
        </div>

        {/* Escola Pública ou Privada */}
        <div>
          <label className="block font-semibold">Tipo de Escola:</label>
          <select
            name="school_type"
            value={formData.school_type}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="Public">Pública</option>
            <option value="Private">Privada</option>
          </select>
        </div>

        {/* Horas de estudo */}
        <div>
          <label className="block font-semibold">
            Horas de estudo por dia:
          </label>
          <input
            type="number"
            name="hours_studied"
            value={formData.hours_studied}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Botão de envio */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Cadastrar Estudante
        </button>
      </form>
    </div>
  );
};

export default RegisterStudent;
