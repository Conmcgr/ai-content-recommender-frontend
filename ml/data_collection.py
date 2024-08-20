from googleapiclient.discovery import build
from dotenv import load_dotenv
import os
import pymongo

load_dotenv()
api_key = os.getenv("YOUTUBE_API_KEY")

youtube = build('youtube', 'v3', developerKey=api_key)

#Make MongoDB connection
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client['sparetime_database']
video_collection = db['videos']

def make_youtube_request(search_string, num_results, channel_id=None):
    request_params = {
        'part': 'snippet',
        'q': search_string,
        'type': 'video',
        'maxResults': num_results
    }

    if channel_id:
        request_params['channelId'] = channel_id

    request = youtube.search().list(**request_params)
    response = request.execute()
    
    return response

def store_metadata(metadata, search_tag):
    for item in metadata['items']:
        video_data = {
            'video_id': item['id']['videoId'],
            'title': item['snippet']['title'],
            'description': item['snippet']['description'],
            'published_at': item['snippet']['publishedAt'],
            'channel_title': item['snippet']['channelTitle'],
            'channel_id': item['snippet']['channelId'],
            'thumbnails': item['snippet']['thumbnails'],
            'tags': item.get('tags', []),
            'category': search_tag
        }

        # Insert into MongoDB
        video_collection.insert_one(video_data)

searches = [
    {'search_string': 'machine learning transformers', 'items': 5, 'chanel_id': 'UCYO_jab_esuFRV4b17AJtAw', 'chanel_name': '3blue1brown'}, 
    {'search_string': 'machine learning transformers', 'items': 5, 'chanel_id': 'UCYO_jab_esuFRV4b17AJtAw', 'chanel_name': '3blue1brown'}, 
    {'search_string': 'machine learning transformers', 'items': 5, 'chanel_id': 'UCYO_jab_esuFRV4b17AJtAw', 'chanel_name': '3blue1brown'}, 
    {'search_string': 'machine learning transformers', 'items': 5, 'chanel_id': 'UCYO_jab_esuFRV4b17AJtAw', 'chanel_name': '3blue1brown'}, 
    
    ]

print(make_youtube_request("Convolution", 2, "UCYO_jab_esuFRV4b17AJtAw"))