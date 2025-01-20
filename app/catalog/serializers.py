from catalog.models import MagazineIssue
from rest_framework import serializers

class MagazineIssueSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = MagazineIssue
        fields = '__all__'
    def to_representation(self, instance):
        representation = super(MagazineIssueSerializer, self).to_representation(instance)
        representation["publication_date"] = instance.get_publication_date()
        return representation
