from pydantic import BaseModel


class UserCreate(BaseModel):
    display_name: str
    username: str
    password: str


class UserOut(BaseModel):
    id: int
    display_name: str
    username: str

    class Config:
        orm_mode = True


class UserLogin(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
