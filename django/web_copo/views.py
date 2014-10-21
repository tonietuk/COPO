from django.shortcuts import render

# Create your views here.
def index(request):
    context = {'test_obj': 'Testing Testing 123'}
    return render(request, 'web_copo/index.html', context)

def try_login_with_orcid_id(request):
    context = {'test_obj': 'Testing Testing 123'}
    return render(request, 'web_copo/index.html', context)