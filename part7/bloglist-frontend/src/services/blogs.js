import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
	token = `bearer ${newToken}`
}

const getAll = async () => {
	const request = axios.get(baseUrl)
	const response = await request
	return response.data
}

const create = async newBlog => {
	const config = { headers: { Authorization: token } }
	const response = await axios.post(baseUrl, newBlog, config)
	return response.data
}

const update = async (newBlog, id) => {
	const config = { headers: { Authorization: token } }
	const response = await axios.put(baseUrl + '/' + id, newBlog, config)
	return response.data
}

const remove = async id => {
	const config = { headers: { Authorization: token } }
	const response = await axios.delete(baseUrl + '/' + id, config)
	return response.data
}

const addComment = async (comment, id) => {
	const response = await axios.post(`${baseUrl}/${id}/comments`, { comment })
	return response.data
}

export default { getAll, create, update, remove, addComment, setToken }
