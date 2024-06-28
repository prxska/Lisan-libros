from django.contrib import admin

# Register your models here.
from .models import User

class UserAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'password')
    search_fields = ('first_name', 'last_name', 'email')




# Register your models here.
admin.site.register(User, UserAdmin)