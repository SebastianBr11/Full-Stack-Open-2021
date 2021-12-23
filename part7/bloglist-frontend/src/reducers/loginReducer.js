import blogService from '../services/blogs'

const reducer = (state = null, action) => {
	switch (action.type) {
		case 'SET_LOGIN_USER':
			return action.payload
		case 'RESET_LOGIN_USER':
			return null
		default:
			return state
	}
}

export const setUser = user => {
	blogService.setToken(user.token)
	return {
		type: 'SET_LOGIN_USER',
		payload: user,
	}
}

export const initUser = () => {
	const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
	let user = null
	if (loggedUserJSON) {
		user = JSON.parse(loggedUserJSON)
		blogService.setToken(user.token)
	}
	return {
		type: 'SET_LOGIN_USER',
		payload: user,
	}
}

export const resetUser = () => {
	window.localStorage.clear()
	return { type: 'RESET_LOGIN_USER' }
}

export default reducer
