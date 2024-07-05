from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets
from mytiktok.models import Item
from mytiktok.serializers import ItemSerializer
from rest_framework import status
from .serp_api import SerpApi
import os
from dotenv import load_dotenv, dotenv_values

class SerpApiSearchView(APIView):
    def post(self, request, *args, **kwargs):
        caption = request.data.get("caption")
        load_dotenv()
        if not caption:
            return Response({"error": "Caption is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            serp_api = SerpApi(api_key=os.environ["SERPAPI"])
            search_results = serp_api.search_google(caption)
            return Response({"search_results": search_results}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        
        
class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer