from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from datetime import date

from database import get_db
from models import Post
from schemas import PostCreate

router = APIRouter(prefix="/posts", tags=["posts"])


@router.get("/")
def get_posts(db: Session = Depends(get_db)):
    return db.query(Post).all()


@router.get("/{post_id}")
def get_post(post_id: int, db: Session = Depends(get_db)):
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="글을 찾을 수 없습니다.")
    return post


@router.post("/")
def create_post(post: PostCreate, db: Session = Depends(get_db)):
    new_post = Post(**post.model_dump(), date=date.today())
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post


@router.put("/{post_id}")
def update_post(post_id: int, post: PostCreate, db: Session = Depends(get_db)):
    existing = db.query(Post).filter(Post.id == post_id).first()
    if not existing:
        raise HTTPException(status_code=404, detail="글을 찾을 수 없습니다.")
    existing.title = post.title
    existing.author = post.author
    existing.content = post.content
    db.commit()
    db.refresh(existing)
    return existing


@router.delete("/{post_id}")
def delete_post(post_id: int, db: Session = Depends(get_db)):
    existing = db.query(Post).filter(Post.id == post_id).first()
    if not existing:
        raise HTTPException(status_code=404, detail="글을 찾을 수 없습니다.")
    db.delete(existing)
    db.commit()
    return {"message": "삭제되었습니다."}
