from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, Text, Date
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import date
from fastapi.middleware.cors import CORSMiddleware

# DB 연결 설정
DATABASE_URL = "postgresql://localhost/board"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

# DB 테이블 모델
class Post(Base):
    __tablename__ = "posts"
    id = Column(Integer, primary_key=True)
    title = Column(String(200))
    author = Column(String(50))
    content = Column(Text)
    date = Column(Date)

# API 요청/응답 모델
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

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "안녕하세요! 게시판 API입니다."}

@app.get("/posts")
def get_posts():
    db = SessionLocal()
    posts = db.query(Post).all()
    db.close()
    return posts

@app.get("/posts/{post_id}")
def get_post(post_id: int):
    db = SessionLocal()
    post = db.query(Post).filter(Post.id == post_id).first()
    db.close()
    if not post:
        raise HTTPException(status_code=404, detail="글을 찾을 수 없습니다.")
    return post

@app.post("/posts")
def create_post(post: PostCreate):
    db = SessionLocal()
    new_post = Post(**post.model_dump(), date=date.today())
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    db.close()
    return new_post

@app.put("/posts/{post_id}")
def update_post(post_id: int, post: PostCreate):
    db = SessionLocal()
    existing = db.query(Post).filter(Post.id == post_id).first()
    if not existing:
        db.close()
        raise HTTPException(status_code=404, detail="글을 찾을 수 없습니다.")
    existing.title = post.title
    existing.author = post.author
    existing.content = post.content
    db.commit()
    db.refresh(existing)
    db.close()
    return existing

@app.delete("/posts/{post_id}")
def delete_post(post_id: int):
    db = SessionLocal()
    existing = db.query(Post).filter(Post.id == post_id).first()
    if not existing:
        db.close()
        raise HTTPException(status_code=404, detail="글을 찾을 수 없습니다.")
    db.delete(existing)
    db.commit()
    db.close()
    return {"message": "삭제되었습니다."}