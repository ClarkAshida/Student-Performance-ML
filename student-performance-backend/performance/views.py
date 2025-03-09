from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
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
        Exemplo: GET /turmas/1/students/ retorna os alunos da turma 1.
        """
        classroom = get_object_or_404(Classroom, pk=pk)
        students = Student.objects.filter(classes=classroom)
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data)

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
    
    def list(self, request):
        """
        Retorna todos os alunos com seus resultados (resumo).
        """
        students = Student.objects.all()
        data = [
        {
            "id": student.id,
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
        Retorna os detalhes de um aluno específico.
        """
        student = get_object_or_404(Student, pk=pk)
        serializer = self.get_serializer(student)
        return Response(serializer.data)
