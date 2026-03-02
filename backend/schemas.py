from pydantic import BaseModel
from datetime import date


class PostCreate(BaseModel):
    title: str
    author: str
    content: str


class PostResponse(BaseModel):
    id: int
    title: str
    author: str
    content: str
    date: date

    class Config:
        from_attributes = True
