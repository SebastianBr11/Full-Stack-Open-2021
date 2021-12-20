const reducer = (state = null, action) => {
	switch (action.type) {
		case 'SET_NOTIFICATION':
			return action.data
		case 'REMOVE_NOTIFICATION':
			return null
		default:
			return state
	}
}

// Already done, don't know if a local variable is the best location, but it works
let currentTimeout = null

export const setNotification = (notification, timeout) => {
	return async dispatch => {
		if (currentTimeout) clearTimeout(currentTimeout)
		dispatch({
			type: 'SET_NOTIFICATION',
			data: notification,
		})
		currentTimeout = setTimeout(
			() => dispatch(removeNotification()),
			timeout * 1000
		)
	}
}

export const removeNotification = notification => {
	return {
		type: 'REMOVE_NOTIFICATION',
	}
}

export default reducer
