import blogService from '../services/blogs'

const reducer = (state = null, action) => {
	switch (action.type) {
		case 'SET_USER':
			return action.payload
		default:
			return state
	}
}

export const setUser = user => {
	blogService.setToken(user.token)
	return {}
}

export default reducer
