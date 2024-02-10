from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from register.models import Student
from register.serializer import StudentSerializer
from rest_framework.parsers import JSONParser
# Create your views here.
class students_list(APIView):
    def get(self, request, format=None):
        students=Student.objects.all()
        serializer=StudentSerializer(students, many=True)
        return Response(serializer.data)
    def post(self, request, format=None):
        data=JSONParser().parse(request)
        serializer=StudentSerializer(data=data)
        if serializer.is_valid():
            serializer.save();
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class student_detail(APIView):
     def get_object(self,pk):
         try:
             student=Student.objects.get(pk=pk)
             return student
            
         except: 
             Student.DoesNotExist
             return None
             
     def get(self,request, pk, format=None):
         student=self.get_object(pk)
         serializer=StudentSerializer(student)
         return Response(serializer.data)
     def put(self, request,pk, format=None):
         student=self.get_object(pk)
         data=JSONParser().parse(request)
         serializer=StudentSerializer(student,data)
         if serializer.is_valid():
             serializer.save()
             return Response(serializer.data, status=status.HTTP_201_CREATED)
         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
     def delete(self, request,pk, format=None):
         student=self.get_object(pk) 
         student.delete();
         return Response(status=status.HTTP_204_NO_CONTENT)