from fastapi import FastAPI
from pymongo import MongoClient

app = FastAPI()

# Kết nối MongoDB
mongo_client = MongoClient("mongodb+srv://ngvh1110:1234@cluster0.jpwcz.mongodb.net/")
db = mongo_client["test"]
posts_collection = db["posts"]
comments_collection = db["comments"]


@app.get("/posts/")
def get_posts():
    posts = list(posts_collection.find({}, {"_id": 0}))  
    return {"posts": posts}


@app.get("/comments/")
def get_comments():
    comments = list(comments_collection.find({}, {"_id": 0}))
    return {"comments": comments}