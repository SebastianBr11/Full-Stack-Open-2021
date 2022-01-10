import React, { useMemo, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = props => {
	const result = useQuery(ALL_BOOKS)
	const [genreFilter, setGenreFilter] = useState(null)

	const allGenres = useMemo(
		() =>
			!result.loading && [
				...new Set(
					result.data.books
						.map(book => book.genres)
						.reduce((acc, val) => [...acc, ...val], [])
				),
			],
		[result.data, result.loading]
	)
	if (!props.show) {
		return null
	}

	if (result.loading) {
		return <div>loading</div>
	}

	return (
		<div>
			<h2>books</h2>
			{genreFilter && <p>in genre {genreFilter}</p>}

			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{result.data.books
						.filter(book =>
							genreFilter ? book.genres.includes(genreFilter) : true
						)
						.map(book => (
							<tr key={book.title}>
								<td>{book.title}</td>
								<td>{book.author.name}</td>
								<td>{book.published}</td>
							</tr>
						))}
				</tbody>
			</table>
			<div>
				{allGenres.map(genre => (
					<button key={genre} onClick={() => setGenreFilter(genre)}>
						{genre}
					</button>
				))}
				<button onClick={() => setGenreFilter(null)}>all genres</button>
			</div>
		</div>
	)
}

export default Books
