import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'

const AuthorSelect = ({ name, setName }) => {
	const result = useQuery(ALL_AUTHORS)

	if (result.loading) return <div>loading</div>

	const handleChange = e => {
		setName(e.target.value)
	}

	return (
		<select value={name} onChange={handleChange}>
			{result.data.authors.map(author => (
				<option key={author.id} value={author.name}>
					{author.name}
				</option>
			))}
		</select>
	)
}

export default AuthorSelect
