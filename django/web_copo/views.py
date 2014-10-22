from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User


import pdb

# Create your views here.
@login_required
def index(request):
    context = {'test_obj': 'Testing Testing 123'}
    return render(request, 'copo/index.html', context)


def try_login_with_orcid_id(request):

    username = request.POST['frm_login_username']
    password = request.POST[('frm_login_password')]

    #try to log into orchid
    return HttpResponse('1')


def copo_login(request):
    #pdb.set_trace()
    if request.method == 'GET':
        print 'running get'
        return render(request, 'copo/login.html')

    else:

        username = request.POST['frm_login_username']
        password = request.POST['frm_login_password']

        if not (username or password):
            return HttpResponseRedirect('/copo/login')
        else:
            user = authenticate(username=username, password=password)
            if user is not None:
                if user.is_active:
                    login(request, user)

                    return HttpResponseRedirect('/copo/')

                # Return a 'disabled account' error message

            # Return an 'invalid login' error message.

            return render(request, 'copo/login.html')

def copo_logout(request):
    logout(request)
    return render(request, 'copo/login.html')


def copo_register(request):
    if request.method == 'GET':
        return render(request, 'copo/register.html')
    else:
        #create user and return to login page
        firstname = request.POST['frm_register_firstname']
        lastname = request.POST['frm_register_lastname']
        email = request.POST['frm_register_email']
        username = request.POST['frm_register_username']
        password = request.POST['frm_register_password']

        user = User.objects.create_user(username, email, password)
        user.set_password(password)
        user.last_name = lastname
        user.first_name = firstname
        user.save()

        return render(request, 'copo/login.html')