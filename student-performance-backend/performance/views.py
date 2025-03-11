from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from django.db.models import Avg, Count
from .models import Student, Classroom
from .serializers import StudentSerializer, ClassroomSerializer
from .prediction_service import predict_student_performance

class ClassroomViewSet(viewsets.ModelViewSet):
    queryset = Classroom.objects.all()
    serializer_class = ClassroomSerializer

    def list(self, request, *args, **kwargs):
        """
        Retorna todas as turmas com a contagem de alunos em cada uma.
        """
        classrooms = Classroom.objects.all()
        data = []

        for classroom in classrooms:
            total_students = Student.objects.filter(classes=classroom).count()
            passed_students = Student.objects.filter(classes=classroom, final_result="Pass").count()

            # Calcular a média de aprovação (evita divisão por zero)
            pass_rate = (passed_students / total_students) * 100 if total_students > 0 else 0

            data.append({
                "id": classroom.id,
                "code": classroom.code,
                "student_count": total_students,
                "pass_rate": round(pass_rate, 2)
            })

        return Response(data)
    
    @action(detail=True, methods=['get'])
    def students(self, request, pk=None):
        """
        Retorna todos os alunos de uma turma específica pelo ID da turma.
        Exemplo: GET /turmas/1/alunos/ retorna os alunos da turma 1.
        """
        classroom = get_object_or_404(Classroom, pk=pk)
        students = Student.objects.filter(classes=classroom)
        data = [
            {
                "id": student.id,
                "age": student.age,
                "name": student.name,
                "gender": student.gender,
                "classes": student.classes.id,
                "attendance": student.attendance,
                "previous_scores": student.previous_scores,
                "hours_studied": student.hours_studied,
                "motivation_level": student.motivation_level,
                "peer_influence": student.peer_influence,
                "final_result": student.final_result
            }
            for student in students
        ]
        return Response(data)
    
    @action(detail=True, methods=['get'])
    def details(self, request, pk=None):
        """
        Retorna dados detalhados sobre uma turma específica.
        Inclui estatísticas sobre os alunos, como taxa de aprovação,
        média de frequência, horas estudadas e motivação.
        """
        classroom = get_object_or_404(Classroom, pk=pk)
        students = Student.objects.filter(classes=classroom)
        total_students = students.count()

        if total_students == 0:
            return Response({
                "id": classroom.id,
                "code": classroom.code,
                "student_count": 0,
                "pass_rate": 0,
                "students_passed": 0,
                "students_failed": 0,
                "average_attendance": 0,
                "average_hours_studied": 0,
                "average_sleep_hours": 0,
                "most_common_motivation_level": None,
                "most_common_peer_influence": None,
                "most_common_teacher_quality": None
            })

        # Quantidade de alunos aprovados e reprovados
        students_passed = students.filter(final_result="Pass").count()
        students_failed = total_students - students_passed

        # Cálculo de médias
        average_attendance = students.aggregate(avg_attendance=Avg("attendance"))["avg_attendance"] or 0
        average_hours_studied = students.aggregate(avg_hours_studied=Avg("hours_studied"))["avg_hours_studied"] or 0
        average_sleep_hours = students.aggregate(avg_sleep_hours=Avg("sleep_hours"))["avg_sleep_hours"] or 0

        # Calcular taxa de aprovação
        pass_rate = (students_passed / total_students) * 100

        # Encontrar os valores mais comuns para algumas categorias
        most_common_motivation_level = students.values("motivation_level").annotate(count=Count("motivation_level")).order_by("-count").first()
        most_common_peer_influence = students.values("peer_influence").annotate(count=Count("peer_influence")).order_by("-count").first()
        most_common_teacher_quality = students.values("teacher_quality").annotate(count=Count("teacher_quality")).order_by("-count").first()

        # Formatar saída para evitar None
        most_common_motivation_level = most_common_motivation_level["motivation_level"] if most_common_motivation_level else None
        most_common_peer_influence = most_common_peer_influence["peer_influence"] if most_common_peer_influence else None
        most_common_teacher_quality = most_common_teacher_quality["teacher_quality"] if most_common_teacher_quality else None

        return Response({
            "id": classroom.id,
            "code": classroom.code,
            "student_count": total_students,
            "pass_rate": round(pass_rate, 2),
            "students_passed": students_passed,
            "students_failed": students_failed,
            "average_attendance": round(average_attendance, 2),
            "average_hours_studied": round(average_hours_studied, 2),
            "average_sleep_hours": round(average_sleep_hours, 2),
            "most_common_motivation_level": most_common_motivation_level,
            "most_common_peer_influence": most_common_peer_influence,
            "most_common_teacher_quality": most_common_teacher_quality
        })

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    def create(self, request, *args, **kwargs):
        """
        Ao cadastrar um aluno, automaticamente gera a predição e salva o resultado.
        """
        # Serializar os dados do aluno
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        student_data = serializer.validated_data

        # Chamar o modelo para predição
        result = predict_student_performance(student_data)

        # Salvar o resultado na instância do aluno
        student = serializer.save(final_result=result)

        return Response({
            "id": student.id,
            "name": student.name,
            "final_result": student.final_result
        })

    @action(detail=True, methods=['get'])
    def details(self, request, pk=None):
        """
        Retorna os detalhes de um aluno específico.
        """
        student = get_object_or_404(Student, pk=pk)
        serializer = self.get_serializer(student)
        return Response(serializer.data)
