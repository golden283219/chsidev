from court.models.case import Case
from django.db import models
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from datetime import datetime, timedelta
from fernet_fields import EncryptedCharField


def validate_after_yesterday(value):
    yesterday =datetime.now() - timedelta(1)
    if value > yesterday :
        raise ValidationError(
            _('моля, изберете дата след вчера '))

class Task(models.Model):
    TYPES_CHOICES = (
      (1,'Type 1'),
      (2,'Type 2'),
      (3,'Type 3'),
      (4,'Type 4'),
      (5,'Type 5'),
      (6,'Type 6'),
      (7,'Type 7'),
      (8,'Type 8'),
      (9,'Type 9'),
      (10,'Type 10'))
      
    case = models.ForeignKey(Case, on_delete=models.CASCADE)

    date_time = models.DateTimeField(validators=[validate_after_yesterday])
    
    note = EncryptedCharField(max_length=255)

    type = models.PositiveSmallIntegerField(choices=TYPES_CHOICES,default=1)
