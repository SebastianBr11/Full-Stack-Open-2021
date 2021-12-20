import axios from 'axios'
import { asObject } from '../reducers/anecdoteReducer'

const baseUrl = 'http://localhost:3001/anecdotes'
console.log(baseUrl)

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const createNew = async content => {
	const anecdote = { content, votes: 0 }
	const response = await axios.post(baseUrl, anecdote)
	return response.data
}

export default {
	getAll,
	createNew,
}
