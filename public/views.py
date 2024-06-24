from django.shortcuts import render
from django.http import HttpResponse 
# Create your views here.

 
def index(request):
    contexto = {}
    return render(request, 'html/index.html', contexto)

def looking(request):
    contexto = {}
    return render(request, 'html/looking.html', contexto)

def login(request):
    contexto = {}
    return render(request, 'html/login.html', contexto)

def register(request):
    contexto = {}
    return render(request, 'html/registrar.html', contexto)