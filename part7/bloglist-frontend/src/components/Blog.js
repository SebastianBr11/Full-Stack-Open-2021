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
		<div>
			<h1>
				{blog.title} {blog.author}
			</h1>
			<a href={blog.url} className='url'>
				{blog.url}
			</a>
			<div className='likes'>
				<span>{blog.likes}</span> likes
				<button onClick={handleLike}>like</button>
			</div>
			<div className='user'>added by {blog.user.name}</div>
			{isSameUser && <button onClick={handleDelete}>remove</button>}
			<div>
				<h2>comments</h2>
				<CommentForm blogId={blog.id} />
				<ul>
					{blog.comments.map((comment, i) => (
						<li key={`${comment}${i}`}>{comment}</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default Blog
