from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import pymongo
import random
import torch
from transformers import BertTokenizer, BertModel
from data_collection import make_embedding

def interest_video_similarity(interest_embedding, videos):
    similarities = {}
    video_weights = {
        "title": 0.32,
        "description" : 0.32,
        "channel title": 0.12,
        "tags" : 0.12,
        "category" : 0.12,
     }

    for video in videos:
        video_data = {
            "video id": video.get('video_id', []),
            "title": video.get('title_embedded', []),
            "description" : video.get('description_embedded', []),
            "channel title": video.get('channel_title_embedded', []),
            "tags" : video.get('tags_embedded', []),
            "category" : video.get('category_embedded', [])
            }

        weighted_sum_similarity = []

        for feature in video_weights:
            similarity = cosine_similarity([interest_embedding], [video_data[feature]])[0][0]
            weighted_sum_similarity += video_weights[feature] * similarity

        similarities.append = (weighted_sum_similarity, video_data["video_id"])
        similarities.sort()

        return similarities[-10:]
     

def ratings_video_similarity(user, videos):
    pass

def get_top_3(videos, user):
    pass

client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client['sparetime_database']
video_collection = db['videos']
videos = video_collection.find({})
users_collection = db['users']
users = users_collection.find({})

dummy_user = {
    "_id": "test_id",
    "email": "connor.q.mcgraw@gmail.com",
    "username":"cmcgraw",
    "password":"test_password",
    "interests": ["machine learning", "financial technology", "software engineering"]
}
embedded_interest = make_embedding(dummy_user["interests"])


