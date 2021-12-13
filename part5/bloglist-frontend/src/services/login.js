import axios from 'axios'
import { baseUrl } from './base'

const url = baseUrl + '/login'

const login = async credentials => {
	const response = await axios.post(url, credentials)
	return response.data
}

export default { login }
