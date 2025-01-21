from catalog.models import MagazineIssue
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.decorators import action
from collections import defaultdict

from catalog.serializers import MagazineIssueSerializer

class MagazineIssueViewSet(ModelViewSet):
    queryset = MagazineIssue.objects.all()
    serializer_class = MagazineIssueSerializer

    def list(self, request):
        queryset = self.filter_queryset(self.get_queryset())
        serializer_output = self.serializer_class(queryset, many=True, context={'request': request}).data

        d=defaultdict(list)
        for instance in serializer_output:
            pub_year = instance['publication_date'].split('/')[1]
            d[pub_year].append(instance)

        return Response(d)

    @action(detail=False, methods=['get'])
    def decades(self, request):
        data = self.list(request).data

        d=defaultdict(list)
        years = data.keys()
        for year in years:
            year=int(year)
            d[int(year - (year%10))].append(year)

        return Response(d)

