function PostList({ posts, onSelect, onWrite, onDelete }) {
  return (
    <div className="card">
      <div className="post-list-header">
        <span className="post-list-title">전체 게시글 {posts.length}개</span>
        <button className="btn btn-primary" onClick={onWrite}>
          ✏️ 글 작성
        </button>
      </div>
      <table className="post-table">
        <thead>
          <tr>
            <th className="col-num">번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>날짜</th>
            <th className="col-manage">관리</th>
          </tr>
        </thead>
        <tbody>
          {posts.length === 0 ? (
            <tr>
              <td colSpan={5}>
                <div className="empty-state">등록된 게시글이 없습니다.</div>
              </td>
            </tr>
          ) : (
            posts.map((post) => (
              <tr key={post.id}>
                <td className="col-num">{post.id}</td>
                <td>
                  <span className="post-title-link" onClick={() => onSelect(post)}>
                    {post.title}
                  </span>
                </td>
                <td className="post-author">{post.author}</td>
                <td className="post-date">{post.date}</td>
                <td className="col-manage">
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      if (window.confirm('정말 삭제하시겠습니까?')) onDelete(post.id)
                    }}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default PostList
