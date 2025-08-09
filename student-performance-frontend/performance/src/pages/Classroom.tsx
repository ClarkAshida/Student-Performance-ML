import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useApi } from "../context/ApiContext";
import { ClassRoomDetails, ClassRoomStudents } from "../types/classRooms";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Badge from "@/components/ui/badge";
import {
  Users,
  TrendingUp,
  Clock,
  BookOpen,
  Heart,
  UserCheck,
  Edit,
  Trash2,
  Eye,
  ArrowLeft,
} from "lucide-react";

const Classroom: React.FC = () => {
  const { fetchClassRoomDetails, fetchClassRoomStudents, deleteStudent } =
    useApi();
  const { id } = useParams();
  const [classRoom, setClassRoom] = useState<ClassRoomDetails | null>(null);
  const [students, setStudents] = useState<ClassRoomStudents[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const data = await fetchClassRoomDetails(Number(id));
        const studentsData = await fetchClassRoomStudents(Number(id));
        setStudents(studentsData);
        setClassRoom(data);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleDeleteStudent = async (studentId: number) => {
    if (window.confirm("Tem certeza que deseja remover este estudante?")) {
      try {
        await deleteStudent(studentId);
        // Atualizar a lista de estudantes
        if (students) {
          setStudents(students.filter((student) => student.id !== studentId));
        }
      } catch (error) {
        console.error("Erro ao remover estudante:", error);
      }
    }
  };

  if (loading) {
    return (
      <Layout title="Carregando..." subtitle="Aguarde...">
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-jade-200 border-t-jade-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-text-secondary font-body">
              Carregando dados da turma...
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!classRoom) {
    return (
      <Layout title="Turma não encontrada" subtitle="Erro ao carregar dados">
        <div className="text-center py-12">
          <p className="text-text-body font-body">Turma não encontrada.</p>
          <Link to="/">
            <Button variant="default" className="mt-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para Turmas
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title={`Turma ${classRoom.code}`}
      subtitle={`${classRoom.student_count} estudante(s) • ${classRoom.pass_rate}% de aprovação`}
    >
      <div className="space-y-6">
        {/* Back Button */}
        <div>
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para Turmas
            </Button>
          </Link>
        </div>

        {/* Classroom Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-jade-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-jade-600" />
                </div>
                <div>
                  <p className="text-h3 font-heading font-bold text-text-primary">
                    {classRoom.student_count}
                  </p>
                  <p className="text-body-sm text-text-secondary font-body">
                    Total de Estudantes
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-h3 font-heading font-bold text-text-primary">
                    {classRoom.pass_rate}%
                  </p>
                  <p className="text-body-sm text-text-secondary font-body">
                    Taxa de Aprovação
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <UserCheck className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-h3 font-heading font-bold text-text-primary">
                    {classRoom.average_attendance}%
                  </p>
                  <p className="text-body-sm text-text-secondary font-body">
                    Frequência Média
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-h3 font-heading font-bold text-text-primary">
                    {classRoom.average_hours_studied}h
                  </p>
                  <p className="text-body-sm text-text-secondary font-body">
                    Horas de Estudo
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Estatísticas Gerais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-text-body font-body">Aprovados:</span>
                <span className="font-medium text-success">
                  {classRoom.students_passed}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-body font-body">Reprovados:</span>
                <span className="font-medium text-danger">
                  {classRoom.students_failed}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-body font-body">Horas de Sono:</span>
                <span className="font-medium text-text-body">
                  {classRoom.average_sleep_hours}h
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Nível de Motivação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="h-8 w-8 text-yellow-600" />
                </div>
                <p className="font-heading font-semibold text-text-primary">
                  {classRoom.most_common_motivation_level}
                </p>
                <p className="text-body-sm text-text-secondary">Mais comum</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Qualidade do Ensino</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="h-8 w-8 text-green-600" />
                </div>
                <p className="font-heading font-semibold text-text-primary">
                  {classRoom.most_common_teacher_quality}
                </p>
                <p className="text-body-sm text-text-secondary">Avaliação</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Students Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-jade-500" />
                Estudantes da Turma
              </div>
              <Badge variant="secondary" className="font-body">
                {students?.length || 0} estudante(s)
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {students && students.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-heading font-semibold text-text-primary">
                        Nome
                      </th>
                      <th className="text-left py-3 px-4 font-heading font-semibold text-text-primary">
                        Gênero
                      </th>
                      <th className="text-left py-3 px-4 font-heading font-semibold text-text-primary">
                        Idade
                      </th>
                      <th className="text-left py-3 px-4 font-heading font-semibold text-text-primary">
                        Frequência
                      </th>
                      <th className="text-left py-3 px-4 font-heading font-semibold text-text-primary">
                        Notas Anteriores
                      </th>
                      <th className="text-left py-3 px-4 font-heading font-semibold text-text-primary">
                        Horas de Estudo
                      </th>
                      <th className="text-left py-3 px-4 font-heading font-semibold text-text-primary">
                        Resultado
                      </th>
                      <th className="text-left py-3 px-4 font-heading font-semibold text-text-primary">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr
                        key={student.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-3 px-4">
                          <Link
                            to={`/aluno/${student.id}`}
                            className="font-body font-medium text-jade-600 hover:text-jade-700 hover:underline"
                          >
                            {student.name}
                          </Link>
                        </td>
                        <td className="py-3 px-4 font-body text-text-body">
                          {student.gender}
                        </td>
                        <td className="py-3 px-4 font-body text-text-body">
                          {student.age}
                        </td>
                        <td className="py-3 px-4 font-body text-text-body">
                          {student.attendance}%
                        </td>
                        <td className="py-3 px-4 font-body text-text-body">
                          {student.previous_scores}
                        </td>
                        <td className="py-3 px-4 font-body text-text-body">
                          {student.hours_studied}h
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            variant={
                              student.final_result === "Passed"
                                ? "success"
                                : "error"
                            }
                          >
                            {student.final_result === "Passed"
                              ? "Aprovado"
                              : "Reprovado"}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <Link to={`/aluno/${student.id}`}>
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Link to={`/editar-aluno/${student.id}`}>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteStudent(student.id)}
                              className="text-danger hover:text-danger-dark hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <Users className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="font-heading text-lg text-text-primary mb-2">
                  Nenhum estudante cadastrado
                </h3>
                <p className="text-text-secondary font-body mb-4">
                  Adicione estudantes para começar a acompanhar o desempenho
                </p>
                <Link to="/cadastrar-aluno">
                  <Button variant="default">
                    <Users className="h-4 w-4 mr-2" />
                    Adicionar Estudante
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Classroom;
