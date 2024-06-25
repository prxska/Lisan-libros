import uuid
from django.db import models
from django.core.validators import MinLengthValidator

# Create your models here.

class User(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15)  # Campo para número de teléfono
    password = models.CharField(max_length=20, validators=[MinLengthValidator(8)])
