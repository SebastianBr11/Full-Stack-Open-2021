import { useState } from 'react'

const Blog = ({ blog }) => {
  const [showingMore, setShowingMore] = useState(false)

  const toggleView = () => setShowingMore(prev => !prev)

  return (
    <div className='blog'>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleView}>{showingMore ? 'hide' : 'view'}</button>
      </div>
      {showingMore && (
        <>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button>like</button>
          </div>
          <div>{blog?.user?.name}</div>
        </>
      )}
    </div>
  )
}

export default Blog
