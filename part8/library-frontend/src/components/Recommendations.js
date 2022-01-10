import { useQuery } from '@apollo/client'
import React from 'react'
import { ALL_BOOKS, ME } from '../queries'
import BookTable from './BookTable'

const Recommendations = ({ show }) => {
	const { loading: meLoading, data: meData } = useQuery(ME)
	const bookResult = useQuery(ALL_BOOKS)

	if (!show) {
		return null
	}

	if (meLoading || bookResult.loading) {
		return <div>loading</div>
	}

	return (
		<div>
			<h1>recommendations</h1>
			<p>books in your favorite genre {meData.me.favoriteGenre}</p>
			<BookTable
				books={bookResult.data.books.filter(book =>
					book.genres.includes(meData.me.favoriteGenre)
				)}
			/>
		</div>
	)
}

export default Recommendations
