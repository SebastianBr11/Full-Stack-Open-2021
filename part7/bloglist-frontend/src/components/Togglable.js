import { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'
import Button from './Button'

const Togglable = forwardRef(({ buttonLabel, children }, ref) => {
	const [visible, setVisible] = useState(false)

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	useImperativeHandle(ref, () => ({ toggleVisibility }))

	return (
		<div>
			<div className={visible ? 'hidden' : ''}>
				<Button className='p-2 pointer' onClick={toggleVisibility}>
					{buttonLabel}
				</Button>
			</div>
			<div className={!visible ? 'hidden' : ''}>
				{children}
				<Button className='pointer' onClick={toggleVisibility}>
					cancel
				</Button>
			</div>
		</div>
	)
})

Togglable.propTypes = {
	buttonLabel: PropTypes.string.isRequired,
}

Togglable.displayName = 'Togglable'

export default Togglable
