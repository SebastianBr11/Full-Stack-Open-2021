import { useState } from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import Input from './Input'
import Label from './Label'

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
			<form onSubmit={handleSubmit} className='grid gap-2'>
				<div className='flex gap-2'>
					<div className='grow-1 flex flex-col'>
						<Label htmlFor='title'>TITLE</Label>
						<Input
							type='text'
							id='title'
							value={title}
							name='Title'
							placeholder='Title'
							onChange={({ target }) => setTitle(target.value)}
						/>
					</div>
					<div className='grow-1 flex flex-col'>
						<Label htmlFor='author'>AUTHOR</Label>
						<Input
							type='text'
							id='author'
							value={author}
							name='Author'
							placeholder='Author'
							onChange={({ target }) => setAuthor(target.value)}
						/>
					</div>
					<div className='grow-1 flex flex-col'>
						<Label htmlFor='url'>URL</Label>
						<Input
							type='text'
							id='url'
							value={url}
							name='Url'
							placeholder='Url'
							onChange={({ target }) => setUrl(target.value)}
						/>
					</div>
				</div>
				<Button look='success' id='submit' type='submit'>
					create
				</Button>
			</form>
		</div>
	)
}

CreateBlog.propTypes = {
	createBlog: PropTypes.func.isRequired,
}

export default CreateBlog
