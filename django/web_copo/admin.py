from django.contrib import admin
from web_copo.models import Collection, Resource, Profile, EnaStudy, EnaStudyAttr

# Register your models here.

admin.site.register(Collection)
admin.site.register(Resource)
admin.site.register(Profile)
admin.site.register(EnaStudy)
admin.site.register(EnaStudyAttr)
