import { forwardRef, useImperativeHandle, useState } from 'react'

const Togglable = forwardRef(({ buttonLabel, children }, ref) => {
	const [visible, setVisible] = useState(false)

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	useImperativeHandle(ref, () => ({ toggleVisibility }))

	return (
		<div>
			<div className={visible ? 'hidden' : ''}>
				<button onClick={toggleVisibility}>{buttonLabel}</button>
			</div>
			<div className={!visible ? 'hidden' : ''}>
				{children}
				<button onClick={toggleVisibility}>cancel</button>
			</div>
		</div>
	)
})

export default Togglable
