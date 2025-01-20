from catalog.models import MagazineIssue
from rest_framework import viewsets

from catalog.serializers import MagazineIssueSerializer

class MagazineIssueViewSet(viewsets.ModelViewSet):
    queryset = MagazineIssue.objects.all()
    serializer_class = MagazineIssueSerializer

