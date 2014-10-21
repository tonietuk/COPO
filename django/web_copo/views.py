from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login

import pdb

# Create your views here.
@login_required
def index(request):
    context = {'test_obj': 'Testing Testing 123'}
    return render(request, 'web_copo/index.html', context)


def try_login_with_orcid_id(request):

    username = request.POST['frm_login_username']
    password = request.POST[('frm_login_password')]

    #try to log into orchid
    return HttpResponse('1')

def login(request):
    return render(request, 'web_copo/login.html')

def try_login_with_copo_credentials(request):
    username = request.POST['frm_login_username']
    password = request.POST['frm_login_password']

    user = authenticate(username=username, password=password)
    if user is not None:
        if user.is_active:
            login(request, user)
            next_url = request.GET['next']
            return HttpResponseRedirect(next_url)

        # Return a 'disabled account' error message

    # Return an 'invalid login' error message.

    context = {}
    return render(request, 'web_copo/', context)

