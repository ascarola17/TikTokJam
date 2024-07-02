from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import generics
from .models import BlogPost
from .serializer import BlogPostSerializer
from rest_framework.views import APIView

class BlogPostListCreate(generics.ListCreateAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer

    def delete(self, request, *args, **kwargs):
        BlogPost.objects.all().delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class BlogPostRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    lookup_field = "pk"

# class BlogPostList(APIView):
#     def get(self, request, format=None):

#         title = request.query_params.get(title_icontains=title)

#         if title:
#             blog_posts = BlogPost.objects.filter(title_icontains=title)
#         else:

#             blog_posts = BlogPost.objects.all()
        
#         serializer = BlogPostSerializer(blog_posts, many = True)
#         return Response(serializer.data, status=status.HTTP_200_OK)
