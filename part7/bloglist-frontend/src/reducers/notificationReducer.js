const reducer = (state = null, action) => {
	switch (action.type) {
		case 'SET_NOTIFICATION':
			return action.payload
		case 'REMOVE_NOTIFICATION':
			return null
		default:
			return state
	}
}

let currentTimeout = null

export const setNotification = (notification, timeout = 5) => {
	return async dispatch => {
		if (currentTimeout) clearTimeout(currentTimeout)
		dispatch({
			type: 'SET_NOTIFICATION',
			payload: notification,
		})
		currentTimeout = setTimeout(
			() => dispatch(removeNotification()),
			timeout * 1000
		)
	}
}

export const setSuccessNotification = (msg, timeout = 5) => {
	return setNotification({ msg, type: 'success' }, timeout)
}

export const setErrorNotification = (msg, timeout = 5) => {
	return setNotification({ msg, type: 'error' }, timeout)
}

export const removeNotification = () => {
	return {
		type: 'REMOVE_NOTIFICATION',
	}
}

export default reducer
