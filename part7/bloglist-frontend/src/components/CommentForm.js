import { useDispatch } from 'react-redux'
import { commentOnBlog } from '../reducers/blogsReducer'
import Button from './Button'
import Input from './Input'

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
			<Input type='text' name='comment' />
			<Button className='ml-2'>add comment</Button>
		</form>
	)
}

export default CommentForm
