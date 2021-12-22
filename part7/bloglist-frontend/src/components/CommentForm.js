import { useDispatch } from 'react-redux'
import { commentOnBlog } from '../reducers/blogsReducer'

const CommentForm = ({ blogId }) => {
	const dispatch = useDispatch()

	const submitHandler = e => {
		e.preventDefault()
		const comment = e.target.comment.value
		dispatch(commentOnBlog({ comment, id: blogId }))
		e.target.comment.value = ''
	}
	return (
		<form onSubmit={submitHandler}>
			<input type='text' name='comment' />
			<button>add comment</button>
		</form>
	)
}

export default CommentForm
