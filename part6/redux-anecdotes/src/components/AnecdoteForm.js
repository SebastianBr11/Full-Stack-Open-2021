import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = ({ addAnecdote, setNotification }) => {
	const onSubmit = async e => {
		e.preventDefault()
		const content = e.target.anecdote.value
		e.target.anecdote.value = ''
		addAnecdote(content)
		setNotification(`You created '${content}'`, 5)
	}

	return (
		<>
			<h2>create new</h2>
			<form onSubmit={onSubmit}>
				<div>
					<input name='anecdote' />
				</div>
				<button>create</button>
			</form>
		</>
	)
}

const mapDispatchToProps = {
	addAnecdote,
	setNotification,
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm
