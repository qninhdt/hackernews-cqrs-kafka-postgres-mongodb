from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

DATABASE_USER = os.getenv("AUTH_DATABASE_USER")
DATABASE_PASSWORD = os.getenv("AUTH_DATABASE_PASSWORD")
DATABASE_HOST = os.getenv("AUTH_DATABASE_HOST")
DATABASE_PORT = os.getenv("AUTH_DATABASE_PORT")
DATABASE_NAME = os.getenv("AUTH_DATABASE_NAME")
DATABASE_URL = f"postgresql://{DATABASE_USER}:{DATABASE_PASSWORD}@{DATABASE_HOST}:{DATABASE_PORT}/{DATABASE_NAME}"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
