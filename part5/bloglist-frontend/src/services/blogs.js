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

const create = async newObject => {
	const config = { headers: { Authorization: token } }
	const response = await axios.post(url, newObject, config)
	return response.data
}

export default { getAll, create, setToken }
