import React, { useState } from "react";
import { useApi } from "@/context/ApiContext";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Badge from "@/components/ui/badge";
import Modal from "@/components/ui/modal";
import {
  GraduationCap,
  Users,
  CheckCircle,
  Plus,
  Eye,
  BookOpen,
} from "lucide-react";

const Home: React.FC = () => {
  const { classRooms, registerClassRoom, setClassRooms } = useApi();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classRoomCode, setClassRoomCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!classRoomCode.trim()) return;

    setIsLoading(true);
    try {
      const newClassRoom = await registerClassRoom({ code: classRoomCode.trim() });
      // Adiciona a nova turma à lista existente
      setClassRooms([...classRooms, newClassRoom]);
      setClassRoomCode("");
      setIsModalOpen(false);
      // Aqui você pode adicionar um toast de sucesso se tiver
    } catch (error) {
      console.error("Erro ao criar turma:", error);
      // Aqui você pode adicionar um toast de erro se tiver
    } finally {
      setIsLoading(false);
    }
  };

  const getPassRateColor = (passRate: number) => {
    if (passRate >= 80) return "text-success";
    if (passRate >= 60) return "text-warning-dark";
    return "text-danger";
  };

  const getPassRateBadgeVariant = (
    passRate: number
  ): "success" | "warning" | "error" => {
    if (passRate >= 80) return "success";
    if (passRate >= 60) return "warning";
    return "error";
  };

  return (
    <Layout
      title="Minhas Turmas"
      subtitle="Gerencie suas turmas e acompanhe o desempenho dos estudantes"
    >
      <div className="space-y-8">
        {/* Header com botão de criar turma */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-h2 font-heading text-text-primary mb-2">
              Turmas Cadastradas
            </h2>
            <p className="text-text-secondary font-body">
              {classRooms.length === 0
                ? "Nenhuma turma cadastrada ainda"
                : `${classRooms.length} turma${classRooms.length !== 1 ? "s" : ""} encontrada${classRooms.length !== 1 ? "s" : ""}`}
            </p>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            variant="default"
            size="lg"
            className="px-6"
          >
            <Plus className="h-5 w-5 mr-2" />
            Criar Nova Turma
          </Button>
        </div>

        {/* Grid de Cards das Turmas */}
        {classRooms.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-jade-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="h-12 w-12 text-jade-600" />
            </div>
            <h3 className="text-h3 font-heading text-text-primary mb-3">
              Bem-vindo ao StudentPro!
            </h3>
            <p className="text-text-secondary font-body mb-6 max-w-md mx-auto">
              Comece criando sua primeira turma para começar a gerenciar
              estudantes e acompanhar seu desempenho acadêmico.
            </p>
            <Button
              onClick={() => setIsModalOpen(true)}
              variant="default"
              size="lg"
            >
              <Plus className="h-5 w-5 mr-2" />
              Criar Primeira Turma
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {classRooms.map((classRoom) => (
              <Card
                key={classRoom.id}
                className="hover:shadow-medium transition-all duration-200 cursor-pointer group border-2 hover:border-jade-200"
              >
                <CardContent className="p-6">
                  {/* Header do Card */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-jade-100 rounded-lg flex items-center justify-center group-hover:bg-jade-200 transition-colors duration-200">
                      <GraduationCap className="h-6 w-6 text-jade-600" />
                    </div>
                    <Badge
                      variant={getPassRateBadgeVariant(classRoom.pass_rate)}
                      size="sm"
                    >
                      {classRoom.pass_rate}%
                    </Badge>
                  </div>

                  {/* Título */}
                  <h3 className="font-heading font-bold text-lg text-text-primary mb-4 group-hover:text-jade-700 transition-colors duration-200">
                    {classRoom.code}
                  </h3>

                  {/* Informações */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-text-body font-body">
                      <Users className="h-4 w-4 mr-3 text-jade-500" />
                      <span className="text-sm">
                        <span className="font-medium">
                          {classRoom.student_count}
                        </span>{" "}
                        estudante{classRoom.student_count !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className="flex items-center font-body">
                      <CheckCircle className="h-4 w-4 mr-3 text-jade-500" />
                      <span
                        className={`text-sm font-medium ${getPassRateColor(classRoom.pass_rate)}`}
                      >
                        {classRoom.pass_rate}% de aprovação
                      </span>
                    </div>
                  </div>

                  {/* Botão de ação */}
                  <Link to={`/turma/${classRoom.id}`} className="block">
                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-jade-50 group-hover:border-jade-300 group-hover:text-jade-700"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Ver Detalhes
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Modal para criar nova turma */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Criar Nova Turma"
        size="sm"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="classroomCode"
              className="block text-sm font-medium text-text-body mb-2 font-body"
            >
              Código da Turma *
            </label>
            <Input
              id="classroomCode"
              type="text"
              placeholder="Ex: MAT-2025-A, HIS-101, FIS-301..."
              value={classRoomCode}
              onChange={(e) => setClassRoomCode(e.target.value)}
              required
              className="font-body"
              disabled={isLoading}
            />
            <p className="text-xs text-text-secondary mt-2 font-body">
              Use um código único e descritivo para identificar a turma
            </p>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsModalOpen(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="default"
              disabled={isLoading || !classRoomCode.trim()}
              className="px-6"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Criando...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Turma
                </>
              )}
            </Button>
          </div>
        </form>
      </Modal>
    </Layout>
  );
};

export default Home;
