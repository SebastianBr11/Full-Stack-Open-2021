import { useLazyQuery, useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { BOOKS_BY_GENRE, ME } from '../queries'
import BookTable from './BookTable'

const Recommendations = ({ show }) => {
	const { loading: meLoading, data: meData } = useQuery(ME)
	const [getBooks, bookResult] = useLazyQuery(BOOKS_BY_GENRE)

	useEffect(() => {
		if (meLoading) return

		getBooks({ variables: { genre: meData.me.favoriteGenre } })
	}, [meLoading, meData])

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
			<BookTable books={bookResult.data.books} />
		</div>
	)
}

export default Recommendations
