from sqlalchemy import Column, Integer, String, Text, Date
from database import Base


class Post(Base):
    __tablename__ = "posts"
    id = Column(Integer, primary_key=True)
    title = Column(String(200))
    author = Column(String(50))
    content = Column(Text)
    date = Column(Date)
