import os
from datetime import datetime
from jose import jwt
from passlib.context import CryptContext
from dotenv import load_dotenv
from cryptography.hazmat.primitives.serialization import load_pem_private_key

# Load environment variables from .env file
load_dotenv()

# Load RSA keys from environment variables
PRIVATE_KEY = open("./jwt_private.pem", "r").read().encode()
PUBLIC_KEY = open("./jwt_public.pub", "r").read().encode()
# PUBLIC_KEY = load_pem_private_key(PRIVATE_KEY, password=None)
ALGORITHM = "RS256"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def create_access_token(data: dict) -> str:
    # For simplicity, the token does not expire.
    return jwt.encode(data, PRIVATE_KEY, algorithm=ALGORITHM)


def decode_access_token(token: str) -> dict:
    return jwt.decode(token, PUBLIC_KEY, algorithms=[ALGORITHM])
