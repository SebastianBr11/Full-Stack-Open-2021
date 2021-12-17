import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, isSameUser, handleLike }) => {
	const [showingMore, setShowingMore] = useState(false)

	const toggleView = () => setShowingMore(prev => !prev)

	const handleDelete = async () => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
			blogService.remove(blog.id)
		}
	}

	return (
		<div className='blog'>
			<div className='details'>
				{blog.title} {blog.author}
				<button onClick={toggleView}>{showingMore ? 'hide' : 'view'}</button>
			</div>
			{showingMore && (
				<>
					<div className='url'>{blog.url}</div>
					<div className='likes'>
						likes <span>{blog.likes}</span>
						<button onClick={handleLike}>like</button>
					</div>
					<div className='user'>{blog.user.name}</div>
					{isSameUser && <button onClick={handleDelete}>remove</button>}
				</>
			)}
		</div>
	)
}

export default Blog
