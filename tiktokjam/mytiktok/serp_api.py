from serpapi import GoogleSearch

class SerpApi:
    def __init__(self, api_key):
        self.api_key = api_key

    def search_google(self, query, limit=5):
        params = {
            "engine": "google_shopping",
            "q": query,
            "api_key": self.api_key,
            "num": limit
        }
        search = GoogleSearch(params)
        results = search.get_dict()
        return results.get("shopping_results", [])
