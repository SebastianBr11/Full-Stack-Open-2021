import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = props => {
	const dispatch = useDispatch()

	const onSubmit = e => {
		e.preventDefault()
		const anecdote = e.target.anecdote.value
		dispatch(addAnecdote(anecdote))
		e.target.anecdote.value = ''
	}

	return (
		<form onSubmit={onSubmit}>
			<div>
				<input name='anecdote' />
			</div>
			<button>create</button>
		</form>
	)
}

export default AnecdoteForm
