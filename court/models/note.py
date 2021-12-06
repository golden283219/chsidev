from court.models.case import Case
from django.db import models
from django.utils.translation import gettext_lazy as _
from fernet_fields import EncryptedTextField


class Note(models.Model):
  
    case = models.ForeignKey(Case, on_delete=models.CASCADE)
    note = EncryptedTextField(null=False)
    created_at = models.DateTimeField(auto_now_add=True)
