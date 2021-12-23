import userService from '../services/users'

const reducer = (state = [], action) => {
	switch (action.type) {
		case 'INIT_USERS':
			return action.payload
		case 'UPDATE_USER':
			return [
				...state.map(user =>
					user.id !== action.payload.id ? user : { ...user, ...action.payload },
				),
			]
		default:
			return state
	}
}

export const initializeUsers = () => {
	return async dispatch => {
		const users = await userService.getAll()
		dispatch({ type: 'INIT_USERS', payload: users })
	}
}

export const addBlogToUser = ({ blog, userId }) => {
	return (dispatch, getState) => {
		const userToUpdate = getState().users.find(user => user.id === userId)
		userToUpdate.blogs = [...userToUpdate.blogs, blog]

		dispatch({ type: 'UPDATE_USER', payload: { blog, id: userId } })
	}
}

export default reducer
