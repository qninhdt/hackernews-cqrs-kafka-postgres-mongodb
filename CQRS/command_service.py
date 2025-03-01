import psycopg2
import json
from kafka import KafkaProducer
from fastapi import FastAPI, HTTPException

app = FastAPI()

# Kết nối PostgreSQL
conn = psycopg2.connect(
    dbname="test",
    user="hoang",
    password="1104",
    host="localhost",
    port="5432"
)
cursor = conn.cursor()

# # Kafka Producer
# producer = KafkaProducer(
#     bootstrap_servers="localhost:9092",
#     value_serializer=lambda v: json.dumps(v).encode("utf-8"),
# )

# API tạo post
@app.post("/posts/")
def create_post(user: str, user_id: int, content: str):
    try:
        cursor.execute(
            "INSERT INTO posts (Username, user_id, content) VALUES (%s, %s, %s) RETURNING id",
            (user, user_id, content)
        )
        post_id = cursor.fetchone()[0]
        conn.commit()

        # Đẩy vào Kafka
        event_data = {"id": post_id, "user": user, "user_id": user_id, "content": content}
        # producer.send("post-events", event_data)

        return {"message": "Post created", "post_id": post_id}
    
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))

# API tạo comment
@app.post("/comments/")
def create_comment(post_id: int, user: str, user_id: int, content: str):
    try:
        # Lưu vào PostgreSQL
        cursor.execute(
            "INSERT INTO comments (post_id, user, user_id, content) VALUES (%s, %s, %s, %s) RETURNING id",
            (post_id, user, user_id, content)
        )
        comment_id = cursor.fetchone()[0]
        conn.commit()

        return {"message": "Comment created", "comment_id": comment_id}
    
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))