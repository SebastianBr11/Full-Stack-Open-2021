import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, isSameUser }) => {
	const [showingMore, setShowingMore] = useState(false)

	const toggleView = () => setShowingMore(prev => !prev)

	const handleLike = async () => {
		const newBlog = {
			user: blog.user.id,
			likes: blog.likes + 1,
			author: blog.author,
			title: blog.title,
			url: blog.url,
		}
		await blogService.update(newBlog, blog.id)
	}

	const handleDelete = async () => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
			blogService.remove(blog.id)
		}
	}

	return (
		<div className="blog">
			<div>
				{blog.title} {blog.author}
				<button onClick={toggleView}>{showingMore ? 'hide' : 'view'}</button>
			</div>
			{showingMore && (
				<>
					<div>{blog.url}</div>
					<div>
						likes {blog.likes}
						<button onClick={handleLike}>like</button>
					</div>
					<div>{blog.user.name}</div>
					{isSameUser && <button onClick={handleDelete}>remove</button>}
				</>
			)}
		</div>
	)
}

export default Blog
