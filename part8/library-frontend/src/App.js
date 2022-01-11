import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient, useSubscription } from '@apollo/client'
import Recommendations from './components/Recommendations'
import { ALL_AUTHORS, BOOKS_BY_GENRE, BOOK_ADDED } from './queries'

const App = () => {
	const [page, setPage] = useState('authors')
	const [token, setToken] = useState(null)
	const client = useApolloClient()

	const updateCacheWith = addedBook => {
		const includedIn = (list, obj) => list.map(p => p.id).includes(obj.id)

		const bookDataInStore = client.readQuery({
			query: BOOKS_BY_GENRE,
			variables: { genre: '' },
		})

		if (!includedIn(bookDataInStore.books, addedBook)) {
			client.writeQuery({
				query: BOOKS_BY_GENRE,
				data: {
					books: [...bookDataInStore.books, addedBook],
				},
			})
		}

		const authorDataInStore = client.readQuery({ query: ALL_AUTHORS })
		if (!includedIn(authorDataInStore.authors, addedBook.author)) {
			client.writeQuery({
				query: ALL_AUTHORS,
				data: {
					authors: [...authorDataInStore.authors, addedBook.author],
				},
			})
		}
	}

	useSubscription(BOOK_ADDED, {
		onSubscriptionData: ({ subscriptionData }) => {
			const addedBook = subscriptionData.data.bookAdded
			window.alert(`A new book with title ${addedBook.title} was added`)
			updateCacheWith(addedBook)
		},
	})

	useEffect(() => {
		const newToken = localStorage.getItem('library-user-token')
		if (newToken) {
			setToken(newToken)
		}
	}, [])

	const logout = () => {
		setToken(null)
		localStorage.clear()
		client.resetStore()
	}

	return (
		<div>
			<div>
				<button onClick={() => setPage('authors')}>authors</button>
				<button onClick={() => setPage('books')}>books</button>
				{token ? (
					<>
						<button onClick={() => setPage('add')}>add book</button>
						<button onClick={() => setPage('recommend')}>recommend</button>
						<button onClick={logout}>logout</button>
					</>
				) : (
					<button onClick={() => setPage('login')}>login</button>
				)}
			</div>

			<Authors show={page === 'authors'} />

			<Books show={page === 'books'} />

			<LoginForm
				setToken={setToken}
				setPage={setPage}
				show={page === 'login'}
			/>

			<NewBook
				show={page === 'add' && !!token}
				updateCacheWith={updateCacheWith}
			/>

			<Recommendations show={page === 'recommend' && !!token} />
		</div>
	)
}

export default App
