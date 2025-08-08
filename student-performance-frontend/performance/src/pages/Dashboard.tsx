import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import StatCard from "@/components/ui/stat-card";
import Badge from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useApi } from "@/context/ApiContext";
import {
  GraduationCap,
  Users,
  TrendingUp,
  AlertTriangle,
  Plus,
  UserPlus,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
  const { classRooms } = useApi();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Calculate statistics
  const classRoomsList = Array.isArray(classRooms) ? classRooms : [];
  const totalClassrooms = classRoomsList.length;
  const totalStudents = classRoomsList.reduce(
    (total, room) => total + (room.student_count || 0),
    0
  );
  const averagePassRate =
    classRoomsList.length > 0
      ? (
          classRoomsList.reduce(
            (total, room) => total + (room.pass_rate || 0),
            0
          ) / classRoomsList.length
        ).toFixed(1)
      : 0;

  // Mock data for students at risk (would come from API)
  const studentsAtRisk = Math.floor(totalStudents * 0.15); // 15% estimated at risk

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <Layout title="Dashboard" subtitle="Visão geral do sistema">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-brand-primary to-brand-secondary rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-heading text-3xl font-bold mb-2">
                Bem-vindo de volta, Professor! 👋
              </h1>
              <p className="text-blue-100 flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {formatDate(currentTime)}
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center">
                <Activity className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total de Turmas"
            value={totalClassrooms}
            subtitle="turmas ativas"
            icon={GraduationCap}
            color="primary"
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Total de Estudantes"
            value={totalStudents}
            subtitle="estudantes cadastrados"
            icon={Users}
            color="success"
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Taxa de Aprovação Geral"
            value={`${averagePassRate}%`}
            subtitle="média das turmas"
            icon={TrendingUp}
            color="success"
            trend={{ value: 5.2, isPositive: true }}
          />
          <StatCard
            title="Estudantes em Risco"
            value={studentsAtRisk}
            subtitle="predição de reprovação"
            icon={AlertTriangle}
            color="warning"
            trend={{ value: 3, isPositive: false }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Charts Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Performance by Class Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-brand-primary" />
                  Taxa de Aprovação por Turma
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {classRoomsList.map((classroom) => (
                    <div
                      key={classroom.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center">
                          <GraduationCap className="h-6 w-6 text-brand-primary" />
                        </div>
                        <div>
                          <p className="font-body font-medium text-gray-700">
                            {classroom.code}
                          </p>
                          <p className="text-sm text-gray-500">
                            {classroom.student_count} estudantes
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-32 bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-success to-brand-jade h-3 rounded-full transition-all duration-300"
                            style={{ width: `${classroom.pass_rate}%` }}
                          />
                        </div>
                        <Badge
                          variant={
                            classroom.pass_rate >= 80
                              ? "success"
                              : classroom.pass_rate >= 60
                                ? "warning"
                                : "error"
                          }
                        >
                          {classroom.pass_rate}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                  {classRoomsList.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <GraduationCap className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                      <p>Nenhuma turma cadastrada ainda</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-brand-primary" />
                  Atividade Recente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                      <UserPlus className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">
                        Novo estudante cadastrado
                      </p>
                      <p className="text-xs text-gray-500">
                        João Silva - Turma A
                      </p>
                    </div>
                    <span className="text-xs text-gray-400">2 min</span>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center">
                      <TrendingUp className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">
                        Predição gerada
                      </p>
                      <p className="text-xs text-gray-500">
                        Maria Santos - Aprovada
                      </p>
                    </div>
                    <span className="text-xs text-gray-400">5 min</span>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="w-8 h-8 bg-warning rounded-full flex items-center justify-center">
                      <AlertTriangle className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">
                        Alerta de risco
                      </p>
                      <p className="text-xs text-gray-500">
                        Pedro Costa - Predição: Reprovação
                      </p>
                    </div>
                    <span className="text-xs text-gray-400">15 min</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/cadastrar-aluno">
                  <Button className="w-full bg-brand-jade hover:bg-brand-jade-dark text-white">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Adicionar Aluno
                  </Button>
                </Link>
                <Link to="/">
                  <Button
                    variant="outline"
                    className="w-full border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Nova Turma
                  </Button>
                </Link>
                <Button variant="outline" className="w-full">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Gerar Relatório
                </Button>
              </CardContent>
            </Card>

            {/* System Health */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="h-5 w-5 mr-2 text-brand-primary" />
                  Status do Sistema
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Modelo ML</span>
                  <Badge variant="success">Ativo</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Base de Dados</span>
                  <Badge variant="success">Conectado</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">API</span>
                  <Badge variant="success">Online</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Backup</span>
                  <Badge variant="info">Agendado</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Top Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Melhores Performances</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {classRoomsList
                    .sort((a, b) => (b.pass_rate || 0) - (a.pass_rate || 0))
                    .slice(0, 3)
                    .map((classroom, index) => (
                      <div
                        key={classroom.id}
                        className="flex items-center space-x-3"
                      >
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                            index === 0
                              ? "bg-yellow-500"
                              : index === 1
                                ? "bg-gray-400"
                                : "bg-orange-600"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-700">
                            {classroom.code}
                          </p>
                          <p className="text-xs text-gray-500">
                            {classroom.pass_rate}% aprovação
                          </p>
                        </div>
                      </div>
                    ))}
                  {classRoomsList.length === 0 && (
                    <p className="text-sm text-gray-500 text-center">
                      Cadastre turmas para ver o ranking
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
