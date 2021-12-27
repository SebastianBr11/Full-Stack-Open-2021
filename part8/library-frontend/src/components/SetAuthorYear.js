import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, CHANGE_AUTHOR_YEAR } from '../queries'
import AuthorSelect from './AuthorSelect'

const SetAuthorYear = () => {
	const [name, setName] = useState('')

	const [setAuthorYear] = useMutation(CHANGE_AUTHOR_YEAR, {
		refetchQueries: [{ query: ALL_AUTHORS }],
	})

	const handleSubmit = e => {
		e.preventDefault()
		const born = e.target.born.value

		setAuthorYear({ variables: { name, setBornTo: Number(born) } })

		e.target.born.value = ''
	}

	return (
		<div onSubmit={handleSubmit}>
			<h2>Set birthyear</h2>
			<form>
				<div>
					<AuthorSelect name={name} setName={setName} />
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
