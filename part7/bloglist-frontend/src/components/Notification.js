const Notification = ({ message, type }) => {
	if (message === null) {
		return null
	}

	return <div className={type + ' notification bg-gray-700'}>{message}</div>
}

export default Notification
