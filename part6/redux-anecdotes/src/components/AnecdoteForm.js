import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import {
	removeNotification,
	setNotification,
} from '../reducers/notificationReducer'

const AnecdoteForm = props => {
	const dispatch = useDispatch()

	const onSubmit = async e => {
		e.preventDefault()
		const content = e.target.anecdote.value
		e.target.anecdote.value = ''
		dispatch(addAnecdote(content))
		dispatch(setNotification(`You created '${content}'`, 5))
	}

	return (
		<>
			<h2>create new</h2>
			<form onSubmit={onSubmit}>
				<div>
					<input name='anecdote' />
				</div>
				<button>create</button>
			</form>
		</>
	)
}

export default AnecdoteForm
