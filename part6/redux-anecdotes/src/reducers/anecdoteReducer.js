import anecdoteService from '../services/anecdotes'

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
