from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from web_copo.models import Collection, Resource, Study

import pudb

# Create your views here.
#@login_required
def index(request):

    username = User(username=request.user)
    #c = Collection.objects.filter(user = username)
    study_set = Study.objects.all()
    context = {'user': request.user, 'studies': study_set}
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

def new_study(request):
    #pudb.set_trace()
    if request.method == 'POST':
        #get current user
        u = User.objects.get(username=request.user)
        a = request.POST['study_abstract']
        sa = a[:147]
        sa += '...'
        d = request.POST['study_date']
        t = request.POST['study_type']
        ti = request.POST['study_title']
        s = Study(title=ti, user=u, date=d, abstract=a, type=t, abstract_short=sa)
        s.save()
        return HttpResponseRedirect('/copo/')

def view_study(request, pk):

    study = Study.objects.get(id=pk)
    context = {'study_title': study.title, 'study_abstract': study.abstract_short}
    return render(request, 'copo/study.html', context)