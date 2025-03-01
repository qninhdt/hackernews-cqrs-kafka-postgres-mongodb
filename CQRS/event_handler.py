from kafka import KafkaConsumer
from pymongo import MongoClient
import json
import logging

logging.basicConfig(level=logging.INFO)

logging.info("Connecting to MongoDB")
mongo_client = MongoClient("mongodb+srv://ngvh1110:1234@cluster0.jpwcz.mongodb.net/")
db = mongo_client["test"]
posts_collection = db["posts"]
comments_collection = db["comments"]

logging.info("Connecting to Kafka")
consumer = KafkaConsumer(
    "quickstart-events",
    bootstrap_servers="localhost:9092",
    value_deserializer=lambda m: json.loads(m.decode("utf-8")),
)

logging.info("Starting to consume messages")
for message in consumer:
    event_data = message.value  # Data from Kafka

    # Save post to 'posts' collection
    post_data = {
        "post_id": event_data["post_id"],
        "username": event_data["username"],
        "user_id": event_data["user_id"],
        "content": event_data["content"],
    }
    posts_collection.insert_one(post_data)
    logging.info(f"Inserted Post: {post_data}")
    
    # # Lưu bình luận vào collection 'comments'
    # for comment in event_data.get("comments", []):
    #     comment_data = {
    #         "comment_id": comment["comment_id"],
    #         "post_id": event_data["post_id"],  
    #         "username": comment["username"],
    #         "content": comment["content"],
    #         "timestamp": comment["timestamp"]
    #     }
    #     comments_collection.insert_one(comment_data)
    #     print("Inserted Comment:", comment_data)
