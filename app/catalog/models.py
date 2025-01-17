import os

from django.core.files.storage import FileSystemStorage
from django.db import models
from django.conf import settings

#COVERS_STORAGE = FileSystemStorage(location="/media/covers")
COVERS_STORAGE = FileSystemStorage(location=os.path.join(settings.BASE_DIR, 'media/covers'))

class MagazineIssue(models.Model):
    publication_date = models.DateField()
    issue_number = models.IntegerField()
    front_cover = models.ImageField(storage=COVERS_STORAGE)

    def __str__(self):
        return f"{self.issue_number}"


class MagazineArticle(models.Model):
    issue = models.ForeignKey('MagazineIssue', on_delete=models.CASCADE)
    publication_year = models.DateField()
    articles = models.ManyToManyField('Author', through='AuthorArticle')
    tags = models.ManyToManyField('Tag', through='ArticleTag')


class Author(models.Model):
    name = models.CharField(max_length=50)
    articles = models.ManyToManyField('MagazineArticle', through='AuthorArticle')

class AuthorArticle(models.Model):
    author = models.ForeignKey('Author', on_delete=models.CASCADE)
    article = models.ForeignKey('MagazineArticle', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.author.__str__()} - {self.article.__str__()}"


class ArticleTag(models.Model):
    tag = models.ForeignKey('Tag', on_delete=models.CASCADE)
    article = models.ForeignKey('MagazineArticle', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.tag.__str__()} - {self.article.__str__()}"
 

class Tag(models.Model):
    name = models.CharField(max_length=30)


