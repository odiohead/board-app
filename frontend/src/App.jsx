import { useState, useEffect } from 'react'
import PostList from './components/PostList'
import PostDetail from './components/PostDetail'
import PostForm from './components/PostForm'

const API_URL = 'http://127.0.0.1:8000'

function App() {
  const [posts, setPosts] = useState([])
  const [selectedPost, setSelectedPost] = useState(null)
  const [editPost, setEditPost] = useState(null)
  const [view, setView] = useState('list')

  const fetchPosts = () => {
    fetch(`${API_URL}/posts`)
      .then((res) => res.json())
      .then((data) => setPosts(data))
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handleSubmit = (formData) => {
    if (editPost) {
      fetch(`${API_URL}/posts/${editPost.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      }).then(() => {
        fetchPosts()
        setEditPost(null)
        setView('list')
      })
    } else {
      fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      }).then(() => {
        fetchPosts()
        setView('list')
      })
    }
  }

  const handleDelete = (id) => {
    fetch(`${API_URL}/posts/${id}`, { method: 'DELETE' })
      .then(() => {
        fetchPosts()
        setView('list')
      })
  }

  const handleEdit = (post) => {
    setEditPost(post)
    setView('write')
  }

  return (
    <div>
      <h1>게시판</h1>
      {view === 'list' && (
        <PostList
          posts={posts}
          onSelect={(post) => { setSelectedPost(post); setView('detail') }}
          onWrite={() => { setEditPost(null); setView('write') }}
          onDelete={handleDelete}
        />
      )}
      {view === 'detail' && (
        <PostDetail
          post={selectedPost}
          onBack={() => setView('list')}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
      {view === 'write' && (
        <PostForm
          onSubmit={handleSubmit}
          onBack={() => setView('list')}
          editPost={editPost}
        />
      )}
    </div>
  )
}

export default App
