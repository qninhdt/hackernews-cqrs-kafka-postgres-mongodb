from kafka import KafkaConsumer
from pymongo import MongoClient
import json

# Kết nối MongoDB
mongo_client = MongoClient("mongodb+srv://ngvh1110:1234@cluster0.jpwcz.mongodb.net/")
db = mongo_client["test"]
posts_collection = db["posts"]
comments_collection = db["comments"]

consumer = KafkaConsumer(
    "post-events",
    bootstrap_servers="localhost:9092",
    value_deserializer=lambda m: json.loads(m.decode("utf-8")),
)

for message in consumer:
    event_data = message.value  # Dữ liệu từ Kafka

    # Lưu bài viết vào collection 'posts'
    post_data = {
        "post_id": event_data["post_id"],
        "username": event_data["username"],
        "user_id": event_data["user_id"],
        "content": event_data["content"],
        "timestamp": event_data["timestamp"]
    }
    posts_collection.insert_one(post_data)
    print("Inserted Post:", post_data)

    # Lưu bình luận vào collection 'comments'
    for comment in event_data.get("comments", []):
        comment_data = {
            "comment_id": comment["comment_id"],
            "post_id": event_data["post_id"],  
            "username": comment["username"],
            "content": comment["content"],
            "timestamp": comment["timestamp"]
        }
        comments_collection.insert_one(comment_data)
        print("Inserted Comment:", comment_data)
