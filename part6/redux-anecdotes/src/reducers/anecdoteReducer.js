// const anecdotesAtStart = [
// 	'If it hurts, do it more often',
// 	'Adding manpower to a late software project makes it later!',
// 	'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
// 	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
// 	'Premature optimization is the root of all evil.',
// 	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
// ]
// const initialState = anecdotesAtStart.map(asObject)

import anecdoteService from '../services/anecdotes'

// const getId = () => (100000 * Math.random()).toFixed(0)

// export const asObject = anecdote => {
// 	return {
// 		content: anecdote,
// 		id: getId(),
// 		votes: 0,
// 	}
// }

export const orderByVotes = anecdotes => {
	return [...anecdotes].sort((a, b) => b.votes - a.votes)
}

const reducer = (state = [], action) => {
	switch (action.type) {
		case 'UPDATE_ANECDOTE':
			const id = action.data.id
			return state.map(a => (a.id === id ? action.data : a))
		case 'ADD_ANECDOTE':
			return [...state, action.data]
		case 'INIT_ANECDOTES':
			return action.data
		default:
			return state
	}
}

export const voteAnecdote = id => {
	return async (dispatch, getState) => {
		const oldAnecdote = getState().anecdotes.find(a => a.id === id)
		const newAnecdote = {
			...oldAnecdote,
			votes: oldAnecdote.votes + 1,
		}
		const updatedAnecdote = await anecdoteService.update(id, newAnecdote)
		dispatch({
			type: 'UPDATE_ANECDOTE',
			data: updatedAnecdote,
		})
	}
}

export const addAnecdote = content => {
	return async dispatch => {
		const newAnecdote = await anecdoteService.createNew(content)
		dispatch({
			type: 'ADD_ANECDOTE',
			data: newAnecdote,
		})
	}
}

export const initalizeAnecdotes = () => {
	return async dispatch => {
		const anecdotes = await anecdoteService.getAll()
		dispatch({
			type: 'INIT_ANECDOTES',
			data: anecdotes,
		})
	}
}

export default reducer
