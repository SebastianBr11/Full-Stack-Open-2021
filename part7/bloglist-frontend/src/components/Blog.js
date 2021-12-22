import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { deleteBlog, likeBlog } from '../reducers/blogsReducer'
import CommentForm from './CommentForm'

const Blog = ({ blog }) => {
	const loggedInUser = useSelector(state => state.loggedInUser)
	const history = useHistory()

	const dispatch = useDispatch()

	const handleDelete = async () => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
			dispatch(deleteBlog(blog.id))
		}
		history.push('/')
	}

	const handleLike = async () => {
		dispatch(likeBlog(blog.id))
	}

	if (!blog) return null

	const isSameUser = loggedInUser.username === blog.user.username

	return (
		<div className='text-gray-300'>
			<h1>
				{blog.title} {blog.author}
			</h1>
			<p>
				<a href={blog.url} className='url'>
					{blog.url}
				</a>
				<p className='likes'>
					<span>{blog.likes}</span> likes
					<button onClick={handleLike}>like</button>
				</p>
				<p className='user'>added by {blog.user.name}</p>
			</p>
			{isSameUser && <button onClick={handleDelete}>remove</button>}
			<div>
				<h2>comments</h2>
				<CommentForm blogId={blog.id} />
				<ul className='flex flex-col gap-1'>
					{blog.comments.map((comment, i) => (
						<li key={`${comment}${i}`}>{comment}</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default Blog
