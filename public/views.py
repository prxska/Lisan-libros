from django.contrib.auth import authenticate, login 
from django.contrib import messages
from django.shortcuts import redirect, render
from django.http import HttpResponse 
from django.contrib.auth.forms import AuthenticationForm

from .models import User 
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

def test(request):
    contexto = {}
    return render(request, 'html/test.html', contexto)

def crearUser(request):
    if request.method == 'POST':
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        email = request.POST.get('email')
        password = request.POST.get('password')
        password_confirmation = request.POST.get('password_confirmation')


        if password != password_confirmation:
            messages.error(request, 'Las contraseñas no coinciden')
            return redirect('register')
        

        if User.objects.filter(email=email).exists():
            messages.error(request, 'El correo electrónico ya está en uso')
            return redirect('register')  

        new_user = User(first_name=first_name, last_name=last_name,
                        email=email, 
                        password=password)
        new_user.save()

        messages.success(request, 'Usuario creado exitosamente')
        return redirect('index')
    
    return redirect(request, 'html/registrar.html')


def loginUser(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        user = authenticate(request, username=email, password=password)

        if user is not None:
            login(request, user)
            messages.success(request, 'Inicio de sesión exitoso')
            return redirect('test')  
        else:
            messages.error(request, 'Correo electrónico o contraseña incorrectos')
            return redirect('login')  

    return render(request, 'html/login.html')  