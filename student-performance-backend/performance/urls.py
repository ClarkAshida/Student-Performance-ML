from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StudentViewSet, ClassroomViewSet

router = DefaultRouter()
router.register(r'alunos', StudentViewSet)
router.register(r'turmas', ClassroomViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('turmas/<int:pk>/alunos/', ClassroomViewSet.as_view({'get': 'students'})),
    path('turmas/<int:pk>/detalhes', ClassroomViewSet.as_view({'get': 'details'})),

]