from django.urls import path
from . import views
urlpatterns = [
    path('students', views.students_list.as_view(), name="index"),
    path('student/<int:pk>/', views.student_detail.as_view(), name="student")
]

