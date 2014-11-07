from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from web_copo.models import Collection, Resource, Bundle

import pdb

# Create your views here.
#@login_required
def index(request):

    username = User(username=request.user)
    #c = Collection.objects.filter(user = username)
    study_set = Bundle.objects.all()
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

def new_bundle(request):

    if request.method == 'POST':
        #get current user
        u = User.objects.get(username=request.user)
        a = request.POST['study_abstract']
        sa = a[:147]
        sa += '...'
        ti = request.POST['study_title']
        s = Bundle(title=ti, user=u, abstract=a, abstract_short=sa)
        s.save()
        return HttpResponseRedirect('/copo/')


def view_bundle(request, pk):

    bundle = Bundle.objects.get(id=pk)
    collections = bundle.collection_set
    context = {'bundle_id':pk, 'bundle_title': bundle.title, 'bundle_abstract': bundle.abstract_short, 'collections': collections}
    return render(request, 'copo/bundle.html', context)

def new_collection(request):

    c_type = request.POST['collection_type']
    c_name = request.POST['collection_name']
    bundle_id = request.POST['bundle_id']
    b = Bundle.objects.get(id=bundle_id)
    c = Collection(name=c_name, type=c_type)
    c.save()
    b.collection_set.add(c)
    c.save()
    context = {'request_type':c_type, 'bundle':b}
    return redirect(request, 'copo/collection/' + c.id + '/view', context)

def view_collection(request, collection_id):
    #pdb.set_trace()
    #collection = Collection.objects.get(id=pk)
    collection = get_object_or_404(Collection, pk=collection_id)
    context = {'collection':collection}
    return render(request, 'copo/collection.html', context)
