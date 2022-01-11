import { useLazyQuery, useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { LOGIN, ME } from '../queries'

const LoginForm = ({ show, setToken, setPage }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const [login, result] = useMutation(LOGIN)

	useEffect(() => {
		if (result.data) {
			const token = result.data.login.value
			setToken(token)
			localStorage.setItem('library-user-token', token)
		}
	}, [result.data])

	if (!show) return null

	const handleSubmit = e => {
		e.preventDefault()

		login({ variables: { username, password } })
		setPage('books')
	}

	return (
		<form onSubmit={handleSubmit}>
			<div>
				name
				<input
					type='text'
					value={username}
					onChange={e => setUsername(e.target.value)}
				/>
			</div>
			<div>
				password
				<input
					type='password'
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
			</div>
			<button type='submit'>login</button>
		</form>
	)
}

export default LoginForm
