import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "@/context/ApiContext";
import { StudentRegisterData } from "@/types/students";
import axios from "axios";

const UpdateStudent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchStudentDetails, updateStudent, classRooms } = useApi();

  const [formData, setFormData] = useState<StudentRegisterData | null>(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const studentData = await fetchStudentDetails(Number(id));
        setFormData(studentData);
      } catch (error) {
        console.error("Erro ao buscar dados do aluno", error);
      }
    };

    fetchStudentData();
  }, [id, fetchStudentDetails]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!formData) return;
    const { name, value, type } = e.target;
    const newValue =
      type === "number"
        ? parseFloat(value)
        : type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value;

    setFormData((prev) => (prev ? { ...prev, [name]: newValue } : prev));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    try {
      await updateStudent(Number(id), formData);
      alert("Dados do aluno atualizados com sucesso!");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessages = Object.entries(error.response.data)
          .map(
            ([field, messages]) =>
              `${field}: ${(messages as string[]).join(", ")}`
          )
          .join("\n");
        alert(`Erro ao atualizar estudante:\n${errorMessages}`);
      } else {
        alert("Erro ao atualizar estudante.");
      }
      console.error("Erro ao atualizar estudante:", error);
    }
  };

  if (!formData) {
    return <div>Carregando...</div>;
  }

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
            <option value="">Selecione</option>
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
            <option value="O">Outro</option>
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

        {/* Turma */}
        <div>
          <label className="block font-semibold">Turma:</label>
          <select
            name="classes"
            value={formData.classes}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Selecione</option>
            {classRooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.code}
              </option>
            ))}
          </select>
        </div>

        {/* Envolvimento dos Pais */}
        <div>
          <label className="block font-semibold">Envolvimento dos Pais:</label>
          <select
            name="parental_involvement"
            value={formData.parental_involvement}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Selecione</option>
            <option value="Low">Baixo</option>
            <option value="Medium">Médio</option>
            <option value="High">Alto</option>
          </select>
        </div>

        {/* Acesso a Recursos */}
        <div>
          <label className="block font-semibold">Acesso a Recursos:</label>
          <select
            name="access_to_resources"
            value={formData.access_to_resources}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Selecione</option>
            <option value="Low">Baixo</option>
            <option value="Medium">Médio</option>
            <option value="High">Alto</option>
          </select>
        </div>

        {/* Nível de Motivação */}
        <div>
          <label className="block font-semibold">Nível de Motivação:</label>
          <select
            name="motivation_level"
            value={formData.motivation_level}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Selecione</option>
            <option value="Low">Baixo</option>
            <option value="Medium">Médio</option>
            <option value="High">Alto</option>
          </select>
        </div>

        {/* Renda Familiar */}
        <div>
          <label className="block font-semibold">Renda Familiar:</label>
          <select
            name="family_income"
            value={formData.family_income}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Selecione</option>
            <option value="Low">Baixo</option>
            <option value="Medium">Médio</option>
            <option value="High">Alto</option>
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
            <option value="">Selecione</option>
            <option value="Low">Baixa</option>
            <option value="Medium">Média</option>
            <option value="High">Alta</option>
          </select>
        </div>

        {/* Influência dos Colegas */}
        <div>
          <label className="block font-semibold">Influência dos Colegas:</label>
          <select
            name="peer_influence"
            value={formData.peer_influence}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Selecione</option>
            <option value="Negative">Negativa</option>
            <option value="Neutral">Neutra</option>
            <option value="Positive">Positiva</option>
          </select>
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
            <option value="">Selecione</option>
            <option value="High School">Ensino Médio</option>
            <option value="College">Faculdade</option>
            <option value="Graduate">Pós-graduação</option>
          </select>
        </div>

        {/* Distância de Casa */}
        <div>
          <label className="block font-semibold">Distância de Casa:</label>
          <select
            name="distance_from_home"
            value={formData.distance_from_home}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Selecione</option>
            <option value="Near">Perto</option>
            <option value="Moderate">Moderada</option>
            <option value="Far">Longe</option>
          </select>
        </div>

        {/* Horas Estudadas */}
        <div>
          <label className="block font-semibold">
            Horas Estudadas por Semana:
          </label>
          <input
            type="number"
            name="hours_studied"
            value={formData.hours_studied}
            min={0}
            max={168}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Porcentagem de Frequência */}
        <div>
          <label className="block font-semibold">
            Porcentagem de Frequência:
          </label>
          <input
            type="number"
            min={0}
            max={100}
            name="attendance"
            value={formData.attendance}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Atividades Extracurriculares */}
        <div>
          <label className="block font-semibold">
            Atividades Extracurriculares:
          </label>
          <input
            type="number"
            min={0}
            max={10}
            name="extracurricular_activities"
            value={formData.extracurricular_activities}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Horas de Sono */}
        <div>
          <label className="block font-semibold">Horas de Sono Diárias:</label>
          <input
            type="number"
            min={0}
            max={24}
            name="sleep_hours"
            value={formData.sleep_hours}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Notas Anteriores */}
        <div>
          <label className="block font-semibold">Nota Anterior:</label>
          <input
            type="number"
            min={0}
            max={100}
            name="previous_scores"
            value={formData.previous_scores}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
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
          <label className="font-semibold">Possui acesso à internet?</label>
        </div>

        {/* Sessões de Tutoria */}
        <div>
          <label className="block font-semibold">Sessões de Tutoria:</label>
          <input
            type="number"
            min={0}
            name="tutoring_sessions"
            value={formData.tutoring_sessions}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Tipo de Escola */}
        <div>
          <label className="block font-semibold">Tipo de Escola:</label>
          <select
            name="school_type"
            value={formData.school_type}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Selecione</option>
            <option value="Public">Pública</option>
            <option value="Private">Privada</option>
          </select>
        </div>

        {/* Atividade Física */}
        <div>
          <label className="block font-semibold">Atividade Física:</label>
          <input
            type="number"
            min={0}
            name="physical_activity"
            value={formData.physical_activity}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
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

export default UpdateStudent;
