import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
	query {
		authors: allAuthors {
			name
			born
			bookCount
			id
		}
	}
`

export const ALL_BOOKS = gql`
	query {
		books: allBooks {
			title
			author {
				name
				born
				bookCount
				id
			}
			published
			id
		}
	}
`

export const CREATE_BOOK = gql`
	mutation createBook(
		$title: String!
		$author: String!
		$published: Int!
		$genres: [String!]!
	) {
		addBook(
			title: $title
			author: $author
			published: $published
			genres: $genres
		) {
			title
			author {
				name
				born
				bookCount
				id
			}
			published
			id
		}
	}
`

export const CHANGE_AUTHOR_YEAR = gql`
	mutation changeAuthorYear($name: String!, $setBornTo: Int!) {
		editAuthor(name: $name, setBornTo: $setBornTo) {
			name
			born
			bookCount
			id
		}
	}
`

export const LOGIN = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			value
		}
	}
`
