from django.db import models
from court.models.case import Case
from fernet_fields import EncryptedEmailField, EncryptedCharField, EncryptedEmailField


class Creditor(models.Model):

    TYPE_OF_PERSONS_CHOICES = (
      (1, 'Физическо лице'),
      (2, 'Юридическо лице'))
    
    GENDER_CHOICES = (
        (1,'Мъж'),
        (2,'Жена')
    )

    type = models.PositiveSmallIntegerField(choices=TYPE_OF_PERSONS_CHOICES,default=1)

    identifier = EncryptedCharField(max_length=255)

    first_name = EncryptedCharField(max_length=255, null=False)

    middle_name = EncryptedCharField(max_length=255, null=False)
    
    last_name = EncryptedCharField(max_length=255, null=False)

    gender = models.PositiveSmallIntegerField(choices=GENDER_CHOICES,null=True)

    country = EncryptedCharField(max_length=255, null=True)

    city = EncryptedCharField(max_length=255, null=False)

    zone = EncryptedCharField(max_length=255, null=True)

    ID_address = EncryptedCharField(max_length=255, null=True)
    
    address = EncryptedCharField(max_length=255, null=False)

    email = EncryptedEmailField(max_length=254, null=True)

    phone = EncryptedCharField(max_length=255, null=True)

    case = models.ForeignKey(Case, on_delete=models.CASCADE)
