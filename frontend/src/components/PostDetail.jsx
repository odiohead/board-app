function PostDetail({ post, onBack, onDelete, onEdit }) {
  return (
    <div>
      <button onClick={onBack}>← 목록으로</button>
      <button onClick={() => onEdit(post)}>수정</button>
      <button onClick={() => {
        if (window.confirm('삭제하시겠습니까?')) onDelete(post.id)
      }}>삭제</button>
      <h2>{post.title}</h2>
      <p>작성자: {post.author} | 날짜: {post.date}</p>
      <hr />
      <p>{post.content}</p>
    </div>
  )
}

export default PostDetail
