import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, BOOKS_BY_GENRE, CREATE_BOOK } from '../queries'

const NewBook = props => {
	const [createBook] = useMutation(CREATE_BOOK, {
		update: (store, response) => {
			const bookDataInStore = store.readQuery({
				query: BOOKS_BY_GENRE,
				variables: { genre: '' },
			})

			store.writeQuery({
				query: BOOKS_BY_GENRE,
				data: {
					...bookDataInStore,
					books: [...bookDataInStore.books, response.data.addBook],
				},
			})

			const authorDataInStore = store.readQuery({ query: ALL_AUTHORS })
			store.writeQuery({
				query: ALL_AUTHORS,
				data: {
					...authorDataInStore,
					authors: [
						...new Set([
							...authorDataInStore.authors,
							response.data.addBook.author,
						]),
					],
				},
			})
		},
	})

	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [published, setPublished] = useState('')
	const [genre, setGenre] = useState('')
	const [genres, setGenres] = useState([])

	if (!props.show) {
		return null
	}

	const submit = async event => {
		event.preventDefault()

		console.log('add book...')
		createBook({
			variables: { title, author, published: Number(published), genres },
		})

		setTitle('')
		setPublished('')
		setAuthor('')
		setGenres([])
		setGenre('')
	}

	const addGenre = () => {
		setGenres(genres.concat(genre))
		setGenre('')
	}

	return (
		<div>
			<form onSubmit={submit}>
				<div>
					title
					<input
						value={title}
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					author
					<input
						value={author}
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					published
					<input
						type='number'
						value={published}
						onChange={({ target }) => setPublished(target.value)}
					/>
				</div>
				<div>
					<input
						value={genre}
						onChange={({ target }) => setGenre(target.value)}
					/>
					<button onClick={addGenre} type='button'>
						add genre
					</button>
				</div>
				<div>genres: {genres.join(' ')}</div>
				<button type='submit'>create book</button>
			</form>
		</div>
	)
}

export default NewBook
