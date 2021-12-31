require('dotenv').config()
const { ApolloServer, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')

const MONGODB_URI = process.env.MONGODB_URI
console.log('connecting to', MONGODB_URI)

mongoose
	.connect(MONGODB_URI)
	.then(() => console.log('connected to mongodb'))
	.catch(err => console.error(err))

const typeDefs = gql`
	type Author {
		name: String!
		born: Int
		bookCount: Int!
		id: ID!
	}

	type Book {
		title: String!
		published: Int!
		author: Author!
		genres: [String!]!
		id: ID!
	}

	type Query {
		bookCount: Int!
		authorCount: Int!
		allBooks(author: String, genre: String): [Book!]!
		allAuthors: [Author!]!
	}

	type Mutation {
		addBook(
			title: String!
			author: String!
			published: Int!
			genres: [String!]!
		): Book
		editAuthor(name: String!, setBornTo: Int!): Author
	}
`

const resolvers = {
	Query: {
		bookCount: () => Book.collection.countDocuments(),
		authorCount: () => Author.collection.countDocuments(),
		allBooks: async (root, args) => {
			if (!args.author && !args.genre) {
				return await Book.find({}).populate('author')
			}

			if (args.author && args.genre) {
				return books.filter(byAuthor).filter(byGenre)
			}

			if (args.genre) {
				return await Book.find({ genres: { $in: args.genre } }).populate(
					'author',
				)
			}

			if (args.author) {
				return books.filter(byAuthor)
			}

			return []
		},
		allAuthors: async () => await Author.find({}),
	},

	Mutation: {
		addBook: async (root, args) => {
			let author = await Author.findOne({ name: args.author })
			if (!author) {
				author = new Author({ name: args.author, born: null })
				await author.save()
			}

			const book = new Book({ ...args, author })
			return book.save()
		},
		editAuthor: async (root, args) => {
			const author = await Author.findOne({ name: args.name })
			if (author) {
				author.born = args.setBornTo
				return await author.save()
			}

			return null
		},
	},

	Author: {
		bookCount: async root => {
			return await Book.count({ author: root.id })
		},
	},
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
})

server.listen().then(({ url }) => {
	console.log(`Server ready at ${url}`)
})
