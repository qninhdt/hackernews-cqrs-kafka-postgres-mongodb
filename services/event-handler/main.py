import asyncio
import json
import logging
import os
from aiokafka import AIOKafkaConsumer

from dotenv import load_dotenv

load_dotenv()

from db import *

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

KAFKA_BOOTSTRAP_SERVERS = os.getenv("KAFKA_BROKER")


async def process_post_created(message):
    """Process post-created events."""
    try:
        event = json.loads(message.value.decode("utf-8"))
        # Assume event has keys: id, content, author, tags, created_at
        # Save event into posts collection with comment_count initialized to 0.
        post = {
            "_id": event["id"],
            "content": event["content"],
            "author": event["author"],
            "tags": event.get("tags", []),
            "comment_count": 0,
            "created_at": event.get("created_at"),
        }
        await db.posts.insert_one(post)
        logger.info(f"Post created and saved: {post}")
    except Exception as e:
        logger.error(f"Error processing post-created event: {e}")


async def process_comment_created(message):
    """Process comment-created events."""
    try:
        event = json.loads(message.value.decode("utf-8"))
        # Assume event has keys: id, post_id, content, author, created_at
        comment = {
            "_id": event["id"],
            "post_id": event["post_id"],
            "content": event["content"],
            "author": event["author"],
            "created_at": event.get("created_at"),
        }
        await db.comments.insert_one(comment)
        logger.info(f"Comment created and saved: {comment}")
        # Increase comment_count for the post
        await db.posts.update_one(
            {"_id": event["post_id"]}, {"$inc": {"comment_count": 1}}
        )
        logger.info(f"Increased comment_count for post {event['post_id']}")
    except Exception as e:
        logger.error(f"Error processing comment-created event: {e}")


async def consume():
    consumer = AIOKafkaConsumer(
        "post-created",
        "comment-created",
        bootstrap_servers=KAFKA_BOOTSTRAP_SERVERS,
        group_id="event-handler-group",
    )
    # Get cluster layout and join group
    await consumer.start()
    try:
        async for message in consumer:
            if message.topic == "post-created":
                await process_post_created(message)
            elif message.topic == "comment-created":
                await process_comment_created(message)
    finally:
        await consumer.stop()


async def start_consumer_loop():
    # Run consumer forever in background
    while True:
        try:
            await consume()
        except Exception as e:
            logger.error(f"Consumer error: {e}")
            await asyncio.sleep(5)


if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    loop.run_until_complete(start_consumer_loop())
