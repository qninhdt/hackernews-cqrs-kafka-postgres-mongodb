from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi import Response
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
    return JSONResponse(content={"posts": posts}, media_type="application/json")


@app.get("/comments/")
def get_comments():
    comments = list(comments_collection.find({}, {"_id": 0}))
    return JSONResponse(content={"comments": comments}, media_type="application/json")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)