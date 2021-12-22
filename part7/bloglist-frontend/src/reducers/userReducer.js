import blogService from '../services/blogs'

const reducer = (state = null, action) => {
	switch (action.type) {
		case 'SET_USER':
			return action.payload
		case 'RESET_USER':
			return null
		default:
			return state
	}
}

export const setUser = user => {
	blogService.setToken(user.token)
	return {
		type: 'SET_USER',
		payload: user,
	}
}

export const initUser = () => {
	const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
	let user = null
	if (loggedUserJSON) {
		user = JSON.parse(loggedUserJSON)
	}
	return {
		type: 'SET_USER',
		payload: user
	}
}


export const resetUser = () => ({ type: 'RESET_USER' })

export default reducer
