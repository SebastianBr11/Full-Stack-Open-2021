import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import {
	removeNotification,
	setNotification,
} from '../reducers/notificationReducer'

const AnecdoteForm = props => {
	const dispatch = useDispatch()

	const onSubmit = e => {
		e.preventDefault()
		const anecdote = e.target.anecdote.value
		e.target.anecdote.value = ''
		dispatch(addAnecdote(anecdote))
		dispatch(setNotification(`You created '${anecdote}'`))
		setTimeout(() => dispatch(removeNotification()), 5000)
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
