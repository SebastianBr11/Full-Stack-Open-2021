import { useDispatch, useSelector } from 'react-redux'
import { orderByVotes, voteAnecdote } from '../reducers/anecdoteReducer'
import {
	removeNotification,
	setNotification,
} from '../reducers/notificationReducer'

const AnecdoteList = () => {
	const anecdotes = useSelector(state =>
		orderByVotes(
			state.anecdotes.filter(a =>
				a.content.toLowerCase().includes(state.filter.toLowerCase())
			)
		)
	)
	const dispatch = useDispatch()

	const vote = id => {
		dispatch(voteAnecdote(id))
		const anecdote = anecdotes.find(a => a.id === id)
		dispatch(setNotification(`you voted '${anecdote.content}'`))
		setTimeout(() => dispatch(removeNotification()), 5000)
	}

	return (
		<>
			{anecdotes.map(anecdote => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote.id)}>vote</button>
					</div>
				</div>
			))}
		</>
	)
}

export default AnecdoteList
