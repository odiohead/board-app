import { useState } from 'react'

function PostForm({ onSubmit, onBack, editPost }) {
  const [title, setTitle] = useState(editPost ? editPost.title : '')
  const [author, setAuthor] = useState(editPost ? editPost.author : '')
  const [content, setContent] = useState(editPost ? editPost.content : '')

  const handleSubmit = () => {
    if (!title || !author || !content) {
      alert('모든 항목을 입력해주세요.')
      return
    }
    onSubmit({ title, author, content })
  }

  return (
    <div className="card">
      <div className="post-form-header">
        <button className="btn btn-secondary" onClick={onBack}>
          ← 목록으로
        </button>
        <span className="post-form-title">{editPost ? '글 수정' : '새 글 작성'}</span>
      </div>
      <div className="post-form-body">
        <div className="form-group">
          <label className="form-label">제목</label>
          <input
            className="form-control"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">작성자</label>
          <input
            className="form-control"
            placeholder="작성자 이름을 입력하세요"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">내용</label>
          <textarea
            className="form-control"
            placeholder="내용을 입력하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>
      <div className="form-actions">
        <button className="btn btn-secondary" onClick={onBack}>
          취소
        </button>
        <button className="btn btn-primary" onClick={handleSubmit}>
          저장
        </button>
      </div>
    </div>
  )
}

export default PostForm
