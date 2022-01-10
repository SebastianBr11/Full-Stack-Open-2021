import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client'
import Recommendations from './components/Recommendations'

const App = () => {
	const [page, setPage] = useState('authors')
	const [token, setToken] = useState(null)
	const client = useApolloClient()

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

			<NewBook show={page === 'add' && !!token} />

			<Recommendations show={page === 'recommend'} />
		</div>
	)
}

export default App
