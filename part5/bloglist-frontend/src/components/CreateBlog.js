import { useState } from 'react'
import PropTypes from 'prop-types'

const CreateBlog = ({ createBlog }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const handleSubmit = async e => {
		e.preventDefault()

		createBlog({ title, author, url })
		setTitle('')
		setAuthor('')
		setUrl('')
	}

	return (
		<div>
			<h1>create new</h1>
			<form onSubmit={handleSubmit}>
				<div>
					title:
					<input
						type="text"
						id="title"
						value={title}
						name="Title"
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					author:
					<input
						type="text"
						id="author"
						value={author}
						name="Author"
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					url:
					<input
						type="text"
						id="url"
						value={url}
						name="Url"
						onChange={({ target }) => setUrl(target.value)}
					/>
				</div>
				<button type="submit">create</button>
			</form>
		</div>
	)
}

CreateBlog.propTypes = {
	createBlog: PropTypes.func.isRequired,
}

export default CreateBlog
