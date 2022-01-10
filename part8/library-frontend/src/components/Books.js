import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { BOOKS_BY_GENRE } from '../queries'
import BookTable from './BookTable'

const Books = props => {
	const [getBooks, result] = useLazyQuery(BOOKS_BY_GENRE)
	const [genreFilter, setGenreFilter] = useState('')
	const [allGenres, setAllGenres] = useState([])

	useEffect(() => {
		const run = async () => {
			const result = await getBooks({ variables: { genre: genreFilter } })

			if (allGenres.length === 0) {
				setAllGenres([
					...new Set(
						result.data.books
							.map(book => book.genres)
							.reduce((acc, val) => [...acc, ...val], [])
					),
				])
			}
		}
		run()
	}, [genreFilter])

	if (!props.show) {
		return null
	}

	if (result.loading) {
		return <div>loading</div>
	}

	return (
		<div>
			<h2>books</h2>
			{genreFilter ? <p>in genre {genreFilter}</p> : <p>in all genres</p>}

			<BookTable books={result.data.books} />
			<div>
				{allGenres.map(genre => (
					<button key={genre} onClick={() => setGenreFilter(genre)}>
						{genre}
					</button>
				))}
				<button onClick={() => setGenreFilter('')}>all genres</button>
			</div>
		</div>
	)
}

export default Books
