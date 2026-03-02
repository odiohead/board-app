from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import posts

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(posts.router)


@app.get("/")
def root():
    return {"message": "안녕하세요! 게시판 API입니다."}
