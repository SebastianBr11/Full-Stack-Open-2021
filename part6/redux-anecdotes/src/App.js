import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
	addAnecdote,
	voteAnecdote,
	orderByVotes,
} from './reducers/anecdoteReducer'

const App = () => {
	const anecdotes = useSelector(state => orderByVotes(state))
	const dispatch = useDispatch()

	const vote = id => {
		dispatch(voteAnecdote(id))
	}

	const onSubmit = e => {
		e.preventDefault()
		const anecdote = e.target.anecdote.value
		dispatch(addAnecdote(anecdote))
		e.target.anecdote.value = ''
	}

	return (
		<div>
			<h2>Anecdotes</h2>
			{anecdotes.map(anecdote => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote.id)}>vote</button>
					</div>
				</div>
			))}
			<h2>create new</h2>
			<form onSubmit={onSubmit}>
				<div>
					<input name='anecdote' />
				</div>
				<button>create</button>
			</form>
		</div>
	)
}

export default App
