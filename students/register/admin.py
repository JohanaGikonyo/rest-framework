from django.contrib import admin
from .models import Student

class StudentAdmin(admin.ModelAdmin):
    list_display = ('name', 'admission', 'created_at')  # Fields to display in the admin list view

admin.site.register(Student, StudentAdmin)
