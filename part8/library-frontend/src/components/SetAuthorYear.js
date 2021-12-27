import { useMutation } from '@apollo/client'
import React from 'react'
import { ALL_AUTHORS, CHANGE_AUTHOR_YEAR } from '../queries'

const SetAuthorYear = () => {
	const [setAuthorYear] = useMutation(CHANGE_AUTHOR_YEAR, {
		refetchQueries: [{ query: ALL_AUTHORS }],
	})

	const handleSubmit = e => {
		e.preventDefault()
		const name = e.target.name.value
		const born = e.target.born.value

		setAuthorYear({ variables: { name, setBornTo: Number(born) } })

		e.target.name.value = ''
		e.target.born.value = ''
	}

	return (
		<div onSubmit={handleSubmit}>
			<h2>Set birthyear</h2>
			<form>
				<div>
					name <input type='text' name='name' />
				</div>
				<div>
					born <input type='number' name='born' />
				</div>
				<button type='submit'>update author</button>
			</form>
		</div>
	)
}

export default SetAuthorYear
