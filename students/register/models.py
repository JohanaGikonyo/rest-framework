from django.db import models

# Create your models here.

class Student(models.Model):
   
    name=models.CharField(max_length=64)
    
    admission=models.CharField(max_length=64)
    
    created_at=models.DateTimeField(auto_now_add=True)
    def __str__(self):
             return f"{self.name} - {self.admission}"
    
    
