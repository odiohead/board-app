function PostList({ posts, onSelect, onWrite, onDelete }) {
  return (
    <div>
      <button onClick={onWrite}>글 작성</button>
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>날짜</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>
                <span
                  onClick={() => onSelect(post)}
                  style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                >
                  {post.title}
                </span>
              </td>
              <td>{post.author}</td>
              <td>{post.date}</td>
              <td>
                <button onClick={() => {
                  if (window.confirm('삭제하시겠습니까?')) onDelete(post.id)
                }}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PostList
