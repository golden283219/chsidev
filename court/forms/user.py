from django.contrib.auth import get_user_model
# from court.models.user import CustomUser
# from django.contrib.auth.models import User
from django import forms
from django.contrib.auth.forms import AuthenticationForm
# from django.core.mail import EmailMultiAlternatives
# from django.template import loader
from django.utils.translation import gettext as _
from django.forms import ModelForm

CustomUserModel = get_user_model()
USER_TYPE_CHOICES = (
      (1, 'admin'),
      (2, 'supervisor'),
      (3, 'manager'),
      (4, 'lawyer'),
  )
class UserForm(ModelForm):
    password = forms.CharField(widget=forms.PasswordInput,required=False)
    username = forms.CharField(required=False)
    user_type = forms.TypedChoiceField(
            label='Тип на потребителя',
            choices = USER_TYPE_CHOICES,
            error_messages={'required' : _("е необходим тип потребител.")},
            widget=forms.Select(attrs={'class':'form-input','required': True, ' data-pristine-required-message' : 'Моля, попълнете полето'}))
    first_name = forms.CharField(error_messages={'max_length': _("първо име е твърде дълъг."),
                    'required' : _("първо име за имейл е задължително.")},label='Име',widget=forms.TextInput(attrs={'class':'form-input','type':'text','required': True,'autofocus' : True ,'data-pristine-required-message' : "Моля, попълнете полето"}))
    middle_name = forms.CharField(error_messages={ 'max_length': _("бащиното име е твърде дълго."),
                    'required' : _("бащиното име за  е задължително.")},label='Презиме',widget=forms.TextInput(attrs={'class':'form-input','type':'text','required': True,'autofocus' : True ,'data-pristine-required-message' : "Моля, попълнете полето"}))
    last_name = forms.CharField(error_messages={'max_length': _("презиме име е твърде дълъг."),
                    'required' : _("презиме за  е задължително.")},label='Фамилия',widget=forms.TextInput(attrs={'class':'form-input','type':'text','required': True,'autofocus' : True ,'data-pristine-required-message' : "Моля, попълнете полето"}))
    email = forms.CharField(
         error_messages = {
                'max_length': _("имейл е твърде дълъг."),
                'required' : _("полето за имейл е задължително."),
                'unique' : _('имейл потребител с този имейл вече съществува.') },
        label='Имейл',widget=forms.TextInput(attrs={'class':'form-input','type':'email','required': True,'autofocus' : True , 'data-pristine-email-message': "Моля, въведете имейл адрес" ,' data-pristine-required-message' : 'Това поле е задължително'}))
    
    class Meta:
        model = CustomUserModel
        fields = ['first_name','middle_name','last_name','user_type','email','password','username']
        labels = {
            'email': _('електронна поща'),
            'password' : _('парола'),
            'first_name' : _('първо име'),
            'middle_name' : _('бащино име'),
            'last_name' : _('фамилия'),
            'user_type' : _('тип потребител'),
        }
        error_messages = {
                'email': {
                    'max_length': _("имейл е твърде дълъг."),
                    'required' : _("полето за имейл е задължително."),
                    'unique' : _('имейл потребител с този имейл вече съществува.')
                },
                'first_name': {
                    'max_length': _("първо име е твърде дълъг."),
                    'required' : _("първо име за имейл е задължително.")
                },
                    'middle_name': {
                    'max_length': _("бащиното име е твърде дълго."),
                    'required' : _("бащиното име за  е задължително.")
                },
                    'last_name': {
                    'max_length': _("презиме име е твърде дълъг."),
                    'required' : _("презиме за  е задължително.")
                },
                'password': {
                    'max_length': _("паролата е твърде дълга."),
                    'required' : _("полето за парола е задължително."),
                    'min_length' : _('Паролата е твърде кратка ')
                },
                'user_type': {
                    'required' : _("е необходим тип потребител."),
                }
            }

class UserUpdateForm(ModelForm):

    password = forms.CharField(widget=forms.PasswordInput,required=False)
    username = None
    user_type = forms.TypedChoiceField(
            label='Тип на потребителя',
            choices = USER_TYPE_CHOICES,
            error_messages={'required' : _("е необходим тип потребител.")},
            widget=forms.Select(attrs={'class':'form-input filled','required': True, ' data-pristine-required-message' : 'Моля, попълнете полето'}))
    first_name = forms.CharField(error_messages={ 'max_length': _("първо име е твърде дълъг."),
                'required' : _("първо име за имейл е задължително.")},label='Име',widget=forms.TextInput(attrs={'class':'form-input filled','type':'text','required': True,'autofocus' : True ,'data-pristine-required-message' : "Моля, попълнете полето"}))
    middle_name = forms.CharField(error_messages={'max_length': _("бащиното име е твърде дълго."),
                'required' : _("бащиното име за  е задължително.")},label='Презиме',widget=forms.TextInput(attrs={'class':'form-input filled','type':'text','required': True,'autofocus' : True ,'data-pristine-required-message' : "Моля, попълнете полето"}))
    last_name = forms.CharField(error_messages={'max_length': _("презиме име е твърде дълъг."),
                'required' : _("презиме за  е задължително.")},
        label='Фамилия',widget=forms.TextInput(attrs={'class':'form-input filled','type':'text','required': True,'autofocus' : True ,'data-pristine-required-message' : "Моля, попълнете полето"}))
    email = forms.CharField(
         error_messages = {
                'max_length': _("имейл е твърде дълъг."),
                'required' : _("полето за имейл е задължително."),
                'unique' : _('имейл потребител с този имейл вече съществува.') },
        label='Имейл',widget=forms.TextInput(attrs={'class':'form-input filled','type':'email','required': True,'autofocus' : True , 'data-pristine-email-message': "Моля, въведете имейл адрес" ,' data-pristine-required-message' : 'Това поле е задължително'}))

    class Meta:
        model = CustomUserModel
        fields = ['first_name','middle_name','last_name','user_type','email']
        labels = {
            'email': _('електронна поща'),
            'password' : _('парола'),
            'first_name' : _('първо име'),
            'middle_name' : _('бащино име'),
            'last_name' : _('фамилия'),
            'user_type' : _('тип потребител'),
        }

        error_messages = {
            'email': {
                'max_length': _("имейл е твърде дълъг."),
                'required' : _("полето за имейл е задължително."),
                'unique' : _('имейл потребител с този имейл вече съществува.')

            },
            'first_name': {
                'max_length': _("първо име е твърде дълъг."),
                'required' : _("първо име за имейл е задължително.")
            },
                'middle_name': {
                'max_length': _("бащиното име е твърде дълго."),
                'required' : _("бащиното име за  е задължително.")
            },
                'last_name': {
                'max_length': _("презиме име е твърде дълъг."),
                'required' : _("презиме за  е задължително.")
            },
            'password': {
                'max_length': _("паролата е твърде дълга."),
                'required' : _("полето за парола е задължително."),
                'min_length' : _('Паролата е твърде кратка ')
            },
            'user_type': {
                'required' : _("е необходим тип потребител."),
            }
        }

class LoginForm(AuthenticationForm): #
    username = forms.CharField(label='електронна поща',widget=forms.TextInput(attrs={'id':'email','class':'form-input','type':'email','required': True,'autofocus' : True , 'data-pristine-email-message': "Моля, въведете имейл адрес" ,' data-pristine-required-message' : 'Това поле е задължително'}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={'id':'password','class':'form-input','required': True, 'data-pristine-email-message': "паролата трябва да е повече от 6 знака" ,' data-pristine-required-message' : 'Това поле е задължително'}))
    remember_me = forms.BooleanField(required=False )
    # username = forms.CharField(widget=forms.TextInput(attrs={'class':'form-input','required': False,'autofocus' : True , 'data-pristine-email-message': "Моля, въведете имейл адрес" ,' data-pristine-required-message' : 'Това поле е задължително'}))
    error_messages = {
            'invalid_login': _(
                "Моля, въведете правилен имейл и парола. Имайте предвид, че и двете полета може да са чувствителни към регистъра."
            ),
            'inactive': _("Този акаунт е неактивен."),
    }
    class Meta:
        model = CustomUserModel
        fields = ('username', 'password')
        labels = {
            'username': _('електронна поща'),
            'password' : _('парола')
        }

        error_messages = {
            'username': {
                'max_length': _("имейл е твърде дълъг."),
                'required' : _("полето за имейл е задължително.")
            },
            'password': {
                'max_length': _("паролата е твърде дълга."),
                'required' : _("полето за парола е задължително."),
                'min_length' : _('Паролата е твърде кратка ')
            },

        }
