import { useDispatch, useSelector } from 'react-redux'
import { orderByVotes, voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
	const anecdotes = useSelector(state => orderByVotes(state.anecdotes))
	const dispatch = useDispatch()

	const vote = id => {
		dispatch(voteAnecdote(id))
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
