import React from 'react'

import { gql, useQuery } from '@apollo/client'

const ALL_AUTHORS = gql`
	query {
		authors: allAuthors {
			name
			born
			bookCount
			id
		}
	}
`

const Authors = props => {
	const result = useQuery(ALL_AUTHORS)

	if (result.loading) {
		return <div>loading</div>
	}

	if (!props.show) {
		return null
	}

	return (
		<div>
			<h2>authors</h2>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>born</th>
						<th>books</th>
					</tr>
					{result.data.authors.map(a => (
						<tr key={a.name}>
							<td>{a.name}</td>
							<td>{a.born}</td>
							<td>{a.bookCount}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Authors
