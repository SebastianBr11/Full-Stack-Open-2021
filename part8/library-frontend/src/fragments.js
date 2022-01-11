import gql from 'graphql-tag'

export const BOOK_DETAILS = gql`
	fragment BookDetails on Book {
		title
		genres
		author {
			name
			born
			bookCount
			id
		}
		published
		id
	}
`
