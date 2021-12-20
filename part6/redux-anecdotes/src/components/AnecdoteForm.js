import { useDispatch } from 'react-redux'
import anecdoteService from '../services/anecdotes'
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
		const anecdote = await anecdoteService.createNew(content)
		dispatch(addAnecdote(anecdote))
		dispatch(setNotification(`You created '${content}'`))
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
