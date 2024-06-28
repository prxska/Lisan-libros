from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.contrib import messages
from django.shortcuts import redirect, render, get_object_or_404
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required
from .forms import LibroForm, UserRegistrationForm
from .models import Libro, User
from django.contrib.auth import get_user_model


def index(request):
    contexto = {}
    return render(request, 'index.html', contexto)

def looking(request):
    contexto = {}
    return render(request, 'looking.html', contexto)

def login(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        if email and password:
            User = get_user_model()
            try:
                user = User.objects.get(email=email)
                user = authenticate(request, username=user.email, password=password)
                if user is not None:
                    auth_login(request, user)
                    return redirect('listar_libros')
                else:
                    messages.error(request, 'Correo electrónico o contraseña incorrectos.')
            except User.DoesNotExist:
                messages.error(request, 'Correo electrónico o contraseña incorrectos.')
        else:
            messages.error(request, 'Por favor, completa todos los campos.')
    return render(request, 'login.html')

def register(request):
    form = UserRegistrationForm()
    contexto = {'form': form}
    return render(request, 'registrar.html', contexto)

def test(request):
    contexto = {}
    return render(request, 'test.html', contexto)

def logout(request):
    auth_logout(request)
    return redirect('login')

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

        new_user = User(first_name=first_name, last_name=last_name, email=email)
        new_user.set_password(password)
        new_user.save()

        messages.success(request, 'Usuario creado exitosamente')
        return redirect('index')

    return render(request, 'registrar.html')

def loginUser(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        user = authenticate(request, username=email, password=password)

        if user is not None:
            auth_login(request, user)
            messages.success(request, 'Inicio de sesión exitoso')
            return redirect('test')
        else:
            messages.error(request, 'Correo electrónico o contraseña incorrectos')
            return redirect('login')

    return render(request, 'login.html')

# public/views.py



@login_required
@login_required
def listar_libros(request):
    libros = Libro.objects.filter(usuario=request.user)
    return render(request, 'listar_libros.html', {'libros': libros})
@login_required
def agregar_libro(request):
    if request.method == 'POST':
        form = LibroForm(request.POST)
        if form.is_valid():
            libro = form.save(commit=False)
            libro.usuario = request.user  # Asigna el usuario autenticado
            libro.save()  # Guarda el libro en la base de datos
            messages.success(request, 'Libro agregado exitosamente')
            return redirect('listar_libros')
    else:
        form = LibroForm()
    return render(request, 'agregar_libro.html', {'form': form})

@login_required
def editar_libro(request, id):
    libro = get_object_or_404(Libro, id=id, usuario=request.user)
    if request.method == 'POST':
        form = LibroForm(request.POST, instance=libro)
        if form.is_valid():
            form.save()
            messages.success(request, 'Libro actualizado exitosamente')
            return redirect('listar_libros')
    else:
        form = LibroForm(instance=libro)
    return render(request, 'editar_libro.html', {'form': form})

@login_required
def eliminar_libro(request, id):
    libro = get_object_or_404(Libro, id=id, usuario=request.user)
    if request.method == 'POST':
        libro.delete()
        messages.success(request, 'Libro eliminado exitosamente')
        return redirect('listar_libros')
    return render(request, 'eliminar_libro.html', {'libro': libro})
