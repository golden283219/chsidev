# from court.models.creditor import Creditor
# from court.models.debtor import Debtor
from court.models.user import CustomUser
from django.db import models


class Case(models.Model):
    CASE_TYPES_CHOICES = (
      (1, 'Type 1'),
      (2, 'Type 2'),
      (3, 'Type 3'),
      (4, 'Type 4'),
      (5, 'Type 5'),
      (6, 'Type 6'),
      (7, 'Type 7'),
      (8, 'Type 8'))
      
    CASE_STATUS_CHOICES = (
      (1, 'Входирано'),
      (2, 'Активно'),
      (3, 'Приключено'))
    
    DELIVERY_METHOD_CHOICES = (
      (1, 'Поща'),
      (2, 'Призовкар'),
      (3, 'Куриер'))

    type = models.PositiveSmallIntegerField(choices=CASE_TYPES_CHOICES,default=1)
    
    status = models.PositiveSmallIntegerField(choices=CASE_STATUS_CHOICES,default=1)

    delivery_method = models.PositiveSmallIntegerField(choices=DELIVERY_METHOD_CHOICES,null=True)
    
    User = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)

