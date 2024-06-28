from django.contrib import admin
from django.urls import path
from public import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='index'),
    path('looking', views.looking, name='looking'),
    path('login', views.login, name='login'),
    path('register/', views.register, name='register'),
    path('crearUser', views.crearUser, name='crearUser'),
    path('loginUser', views.loginUser, name='loginUser'),
    path('test', views.test, name='test'),
    path('logout/', views.logout, name='logout'),
    path('libros/editar/<int:id>/', views.editar_libro, name='editar_libro'),
    path('libros/eliminar/<int:id>/', views.eliminar_libro, name='eliminar_libro'),
    path('agregar-libro/', views.agregar_libro, name='agregar_libro'),
    path('listar-libros/', views.listar_libros, name='listar_libros'),
]
