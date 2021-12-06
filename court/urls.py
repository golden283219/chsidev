from django.urls import path
from . import views

urlpatterns = [
    path('cases', views.CaseListView.as_view(), name='cases'),
    # path('login_', views.LoginView.as_view(), name='login'),
    path('login', views.LoginView.as_view(), name='login'),
    path('users', views.UserListView.as_view(), name='users'),
    path('calendar', views.calendar, name='calendar'),
    path('add-user', views.UserCreateView.as_view(), name='add-user'),
    path('user/<pk>',views.UserUpdateView.as_view(),name='update-user'),
    path('user/status', views.changeStatus, name='update_status'),
    path('case', views.caseDetails, name='case'),
    path('cases-list', views.casesList, name='cases-list'),
    path('caseDetails', views.adminCase, name='caseDetails'),
    path('manager-case-details', views.managerCase, name="manager-case-details"),
    path('lawyer-case-details', views.lawyerCase, name="lawyer-case-details"),
    path('case-summary', views.lawyerCaseSUmmary, name="case-summary")
]