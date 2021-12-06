# from court.forms.password_reset import PasswordResetCustomForm
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.mail import send_mail
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.http import HttpRequest
# from django.contrib.auth.forms import PasswordResetForm
import logging
logger = logging.getLogger(__name__)
# from fernet_fields import EncryptedTextField, EncryptedEmailField
# import pgcrypto
# from django_cryptography.fields import encrypt

def set_username(sender, instance, **kwargs):
      if not instance.username:
          instance.username = instance.first_name+instance.last_name+instance.pk
class CustomUser(AbstractUser):

    USER_TYPE_CHOICES = (
      (1, 'admin'),
      (2, 'supervisor'),
      (3, 'manager'),
      (4, 'lawyer'),
  )

    email = models.EmailField(max_length=254, unique=True)
    # email = EncryptedEmailField(max_length=254)
    USERNAME_FIELD = 'email' # make users login with emails
    REQUIRED_FIELDS = []
    first_name = models.CharField(max_length=255, null=False)
    middle_name = models.CharField(max_length=255, null=False,default='test')
    last_name = models.CharField(max_length=255, null=False)
    user_type = models.PositiveSmallIntegerField(choices=USER_TYPE_CHOICES,default=1)
    # last_name = encrypt(models.CharField(max_length=255, null=False))
    # username = encrypt(models.CharField(max_length=255, null=False))
    # first_name = pgcrypto.EncryptedCharField(max_length=255)
    # last_name = pgcrypto.EncryptedCharField(max_length=255)
    # username = pgcrypto.EncryptedCharField(max_length=255, null=False)

    def __str__(self):
        return self.first_name + " " + self.middle_name + " " + self.last_name
   

# @receiver(post_save, sender=CustomUser)
# def send_new_CustomUser_notification_email(sender, instance, created, **kwargs):

#     # if a new officer is created, compose and send the email
#     if created:
#         try:
#             if instance.email:
#                 logger.info("Sending email for to this email:", instance.email)
#                 form = PasswordResetCustomForm({'email': instance.email})
                
#                 # assert form.is_valid()
#                 request = HttpRequest()
#                 request.META['SERVER_NAME'] = 'localhost'
#                 request.META['SERVER_PORT'] = '443'
#                 form.save(
#                     request= request,
#                     use_https=True,
#                     from_email="username@gmail.com", 
#                         email_template_name='registration/password_reset_email.html')

#         except Exception as e:
#             logger.warning(str(e))
