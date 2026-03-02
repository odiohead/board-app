function PostDetail({ post, onBack, onDelete, onEdit }) {
  return (
    <div className="card">
      <div className="post-detail-actions">
        <button className="btn btn-secondary" onClick={onBack}>
          ← 목록으로
        </button>
        <button className="btn btn-warning" onClick={() => onEdit(post)}>
          수정
        </button>
        <button
          className="btn btn-danger"
          onClick={() => {
            if (window.confirm('정말 삭제하시겠습니까?')) onDelete(post.id)
          }}
        >
          삭제
        </button>
      </div>
      <div className="post-detail-body">
        <h2 className="post-detail-title">{post.title}</h2>
        <div className="post-detail-meta">
          <span>👤 {post.author}</span>
          <span>📅 {post.date}</span>
        </div>
        <p className="post-detail-content">{post.content}</p>
      </div>
    </div>
  )
}

export default PostDetail
