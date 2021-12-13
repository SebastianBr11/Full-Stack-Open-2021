import axios from 'axios'
import { baseUrl } from './base'

const url = baseUrl + '/blogs'

let token = null

const setToken = newToken => {
	token = `bearer ${newToken}`
}

const getAll = async () => {
	const request = axios.get(url)
	const response = await request
	return response.data
}

const create = async newBlog => {
	const config = { headers: { Authorization: token } }
	const response = await axios.post(url, newBlog, config)
	return response.data
}

const update = async (newBlog, id) => {
	const config = { headers: { Authorization: token } }
	const response = await axios.put(url + '/' + id, newBlog, config)
	return response.data
}

const remove = async id => {
	const config = { headers: { Authorization: token } }
	const response = await axios.delete(url + '/' + id, config)
	return response.data
}

export default { getAll, create, update, remove, setToken }
