// const anecdotesAtStart = [
// 	'If it hurts, do it more often',
// 	'Adding manpower to a late software project makes it later!',
// 	'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
// 	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
// 	'Premature optimization is the root of all evil.',
// 	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
// ]
// const initialState = anecdotesAtStart.map(asObject)

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => {
	return {
		content: anecdote,
		id: getId(),
		votes: 0,
	}
}

export const orderByVotes = anecdotes => {
	return [...anecdotes].sort((a, b) => b.votes - a.votes)
}

const reducer = (state = [], action) => {
	switch (action.type) {
		case 'VOTE_ANECDOTE':
			const oldAnecdote = state.find(a => a.id === action.data.id)
			const newAnecdote = {
				...oldAnecdote,
				votes: oldAnecdote.votes + 1,
			}
			return state.map(a => (a.id === action.data.id ? newAnecdote : a))
		case 'ADD_ANECDOTE':
			return [...state, action.data]
		case 'INIT_ANECDOTES':
			return action.data
		default:
			return state
	}
}

export const voteAnecdote = id => {
	return {
		type: 'VOTE_ANECDOTE',
		data: { id },
	}
}

export const addAnecdote = anecdote => {
	return {
		type: 'ADD_ANECDOTE',
		data: asObject(anecdote),
	}
}

export const initalizeAnecdotes = anecdotes => {
	return {
		type: 'INIT_ANECDOTES',
		data: anecdotes,
	}
}

export default reducer
