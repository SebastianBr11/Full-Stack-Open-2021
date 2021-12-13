import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
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
		console.log('new', newBlog, 'Old', blog)
		await blogService.update(newBlog, blog.id)
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
				</>
			)}
		</div>
	)
}

export default Blog
