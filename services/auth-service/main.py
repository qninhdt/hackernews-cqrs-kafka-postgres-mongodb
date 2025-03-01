import os
from datetime import datetime
from fastapi import FastAPI, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

import models, schemas, auth, database

# Create database tables (in production use migrations)
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

# Dependency
get_db = database.get_db


@app.post("/signup", response_model=schemas.UserOut)
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # Check if user exists
    db_user = (
        db.query(models.User).filter(models.User.username == user.username).first()
    )
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    # Create user
    hashed_pw = auth.get_password_hash(user.password)
    new_user = models.User(
        display_name=user.display_name,
        username=user.username,
        hashed_password=hashed_pw,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@app.post("/signin", response_model=schemas.Token)
def signin(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = (
        db.query(models.User).filter(models.User.username == user.username).first()
    )
    if not db_user or not auth.verify_password(user.password, db_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )
    # Create token payload
    token_data = {
        "user_id": db_user.id,
        "username": db_user.username,
        "display_name": db_user.display_name,
    }
    token = auth.create_access_token(token_data)
    return {"access_token": token}


@app.get("/user/{user_id}", response_model=schemas.UserOut)
def get_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@app.get("/user", response_model=list[schemas.UserOut])
def get_all_users(db: Session = Depends(get_db)):
    users = db.query(models.User).all()
    return users


@app.get("/whoami", response_model=schemas.UserOut)
def whoami(request: Request, db: Session = Depends(get_db)):
    # extract token from header (Bearer token)
    token = request.headers.get("Authorization")
    token = token.split(" ")[1]

    token_data = auth.decode_access_token(token)
    user_id = token_data.get("user_id")

    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token")
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=80, reload=False)
