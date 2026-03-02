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
    <div>
      <button onClick={onBack}>← 목록으로</button>
      <h2>{editPost ? '글 수정' : '글 작성'}</h2>
      <div>
        <input
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <input
          placeholder="작성자"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div>
        <textarea
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button onClick={handleSubmit}>저장</button>
    </div>
  )
}

export default PostForm
