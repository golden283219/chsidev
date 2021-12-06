from django.contrib.auth.models import User
from django.core.checks import messages
from django.views.generic.edit import CreateView, UpdateView
from court.models.user import CustomUser
from court.models import Case
from django.contrib.auth import authenticate, login, logout
from django.http.response import Http404, HttpResponse, HttpResponseBadRequest, HttpResponseRedirect
from django.shortcuts import redirect, render
from django.views.generic.list import ListView
from django.conf import settings
import json
from django.db.models import Count , Q
from django.contrib.auth.mixins import LoginRequiredMixin
from court.forms.user import LoginForm, UserUpdateForm, UserForm
from django.contrib.auth import authenticate, login as dj_login, logout
from django.http.response import HttpResponse, HttpResponseRedirect
from django.shortcuts import redirect, render
from django.views.generic import View,FormView
from django.contrib.auth.views import LoginView
from django.conf import settings
from django.urls import reverse_lazy
from django.contrib.auth.hashers import make_password
# Create your views here.
def load_test_view(request):
    return render (request, 'test.html')
def calendar(request):
    return render (request, 'calendar.html')

class LoginView(LoginView):

    authentication_form = LoginForm
    form_class = LoginForm
    success_url = reverse_lazy('login')
    template_name = 'login/login.html'

    def form_valid(self, form):

        user = authenticate(username=form.cleaned_data['username'], password=form.cleaned_data['password'])
        if user is not None:
            remember_me = form.cleaned_data['remember_me']
            dj_login(self.request, form.get_user())

            if remember_me:

                self.request.session.set_expiry(1209600)

            if user.is_active:
                if user.user_type == 1:
                    return HttpResponse("admin user.")
                elif user.user_type == 2:
                    return HttpResponse("supervisor user.")
                elif user.user_type == 3:
                    return HttpResponse("manager user.")
                else:
                    return HttpResponse("lawyer user.")

                # return HttpResponseRedirect('/form')
            else:
                return HttpResponse("Inactive user.")
        return super(LoginView, self).form_valid(form)


class LogoutView(View):
    def get(self, request):
        logout(request)
        return HttpResponseRedirect(settings.LOGIN_URL)


def load_cases_view(request):
    return render (request,  'supervisor/cases.html')


# def login(request):
#     return render (request, 'login/login.html')

def adminCase(request):
    return render (request, 'admin-account/case-details.html')

def managerCase(request):
    return render (request, 'manager/case-details.html')

def lawyerCase(request):
    return render (request, 'lawyer/case-details.html')

def lawyerCaseSUmmary(request):
    return render (request, 'lawyer/case-summary.html')
    
def users(request):
    return render (request, 'admin-account/users.html')
    
def addUser(request):
    return render (request, 'admin-account/add-user.html')


class UserListView(ListView,LoginRequiredMixin):
    model = CustomUser
    paginate_by = 5
    context_object_name = "users"
    template_name = "admin-account/users.html"

    def get(self, request, *args, **kwargs):
        if not request.user.user_type == 1:
             raise Http404
        self.object_list = self.get_queryset()

        context = self.get_context_data()
        return self.render_to_response(context)


    def get_queryset(self):
        sort_key = 'pk'

        if self.request.GET.get('sort') == 'descending':
            sort_key = '-case_count'
        elif self.request.GET.get('sort') == 'ascending':
            sort_key = 'case_count'

        if self.request.GET.get('filter'):
            filter =self.request.GET.get('filter')
            users =CustomUser.objects.filter(Q(first_name__contains = filter) | Q(last_name__contains= filter)).exclude(pk=self.request.user.id).annotate(
             case_count=Count('case')).order_by(sort_key)
        else: 
             users = CustomUser.objects.exclude(pk=self.request.user.id).annotate(
             case_count=Count('case')).order_by(sort_key)       
        return users

class UserUpdateView(UpdateView):
    model = CustomUser
    template_name = "admin-account/update-user.html"
    context_object_name = 'user'
    form_class = UserUpdateForm
    success_url = reverse_lazy('users')
    # def form_valid(self, form):
    #     print(self.request.get('pk'))
    #     form.instance.id = self.request.get('pk')
    #     return super().form_valid(form)
class UserCreateView(CreateView):
    model = CustomUser
    template_name = "admin-account/add-user.html"
    form_class = UserForm
    success_url = reverse_lazy('users')
    def form_valid(self, form):
        password = CustomUser.objects.make_random_password()
        print(password)
        form.instance.username = form.cleaned_data['first_name']+form.cleaned_data['last_name']
        form.instance.password = make_password(password)
        return super().form_valid(form)
def changeStatus(request):
        if request.method == 'POST':
            data = json.load(request)

            if data['user']:
                user = CustomUser.objects.get(id=data['user'])
                if user is not None  and user.is_active == True:
                    user.is_active = False
                else:
                    user.is_active = True
                user.save()
                message = "user is active status " +str(user.is_active)

                return HttpResponse(message)
        return HttpResponseBadRequest('error')

    
def caseDetails(request):
    return render (request, 'supervisor/case-details.html')

def casesList(request):
    return render (request, 'lawyer/cases-list.html')


class CaseListView(ListView):
    model = Case
    paginate_by = 6
    context_object_name = "cases"
    template_name = "supervisor/cases.html"

    def get(self, request, *args, **kwargs):
        self.object_list = self.get_queryset()
        context = self.get_context_data()
        return self.render_to_response(context)

    def get_queryset(self):
        order_by = ['status', 'created_at']
        filters = []
        if self.request.GET.get('sort') == 'descending':
            order_by = ['-status', '-created_at']

        if self.request.GET.get('filter'):
            filters.append(Q(id__contains=self.request.GET.get('filter')))

        user_type = self.request.user.get_user_type_display()
        if user_type in ["manager", "lawyer"]:
            user_id = self.request.user.id
            filters.append(Q(User_id=user_id))

        if filters:
            cases = Case.objects.filter(*filters).order_by(*order_by)
        else:
            cases = Case.objects.order_by(*order_by)

        return cases
