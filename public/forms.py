# public/forms.py

from django import forms
from .models import Libro
from django.contrib.auth.models import User

class LibroForm(forms.ModelForm):
    class Meta:
        model = Libro
        fields = ['titulo', 'autor', 'fecha_publicacion', 'fecha_recibo']
        widgets = {
            'fecha_publicacion': forms.DateInput(attrs={'type': 'date', 'placeholder': 'dd/mm/aaaa'}),
            'fecha_recibo': forms.DateInput(attrs={'type': 'date', 'placeholder': 'dd/mm/aaaa'}),
        }

class UserRegistrationForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)
    confirm_password = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'password']

    def clean_confirm_password(self):
        password = self.cleaned_data.get('password')
        confirm_password = self.cleaned_data.get('confirm_password')
        if password != confirm_password:
            raise forms.ValidationError("Las contraseñas no coinciden.")
        return confirm_password
