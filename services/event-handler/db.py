from motor.motor_asyncio import AsyncIOMotorClient
import os

DATABSE_USER = os.getenv("QUERY_DATABASE_USER")
DATABASE_PASSWORD = os.getenv("QUERY_DATABASE_PASSWORD")
DATABASE_HOST = os.getenv("QUERY_DATABASE_HOST")
DATABASE_PORT = os.getenv("QUERY_DATABASE_PORT")
MONGO_URI = (
    f"mongodb://{DATABSE_USER}:{DATABASE_PASSWORD}@{DATABASE_HOST}:{DATABASE_PORT}"
)
DATABASE_NAME = os.getenv("QUERY_DATABASE_NAME")

client = AsyncIOMotorClient(MONGO_URI)
db = client[DATABASE_NAME]
posts = db.posts
comments = db.comments
