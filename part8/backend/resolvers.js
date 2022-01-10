const { UserInputError, AuthenticationError } = require('apollo-server-express')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const pubsub = new PubSub()

const JWT_SECRET = process.env.SECRET

const resolvers = {
	Query: {
		bookCount: () => Book.collection.countDocuments(),
		authorCount: () => Author.collection.countDocuments(),
		allBooks: async (root, args) => {
			if (!args.author && !args.genre) {
				return await Book.find({}).populate('author')
			}

			if (args.author && args.genre) {
				const author = await Author.findOne({ name: args.author })
				if (!author) throw new UserInputError('Author was not found')

				return await Book.find({
					genres: { $in: args.genre },
					author: author.id,
				}).populate('author')
			}

			if (args.genre) {
				return await Book.find({ genres: { $in: args.genre } }).populate(
					'author'
				)
			}

			if (args.author) {
				const author = await Author.findOne({ name: args.author })
				if (!author) throw new UserInputError('Author was not found')

				return await Book.find({ author: author.id }).populate('author')
			}

			return []
		},
		allAuthors: async () => await Author.find({}),
		me: (root, args, context) => context.currentUser,
	},

	Mutation: {
		addBook: async (root, args, { currentUser }) => {
			if (!currentUser) {
				throw new AuthenticationError('not authenticated')
			}

			try {
				let author = await Author.findOne({ name: args.author })
				if (!author) {
					author = new Author({ name: args.author, born: null })
					await author.save()
				}

				const book = new Book({ ...args, author })
				await book.save()

				pubsub.publish('BOOK_ADDED', { bookAdded: book })
				return book
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				})
			}
		},
		editAuthor: async (root, args, { currentUser }) => {
			if (!currentUser) {
				throw new AuthenticationError('not authenticated')
			}

			const author = await Author.findOne({ name: args.name })
			if (author) {
				author.born = args.setBornTo
				try {
					return await author.save({})
				} catch (error) {
					throw new UserInputError(error.message, {
						invalidArgs: args,
					})
				}
			}

			return null
		},
		createUser: async (root, args) => {
			const user = new User({ ...args })

			try {
				return await user.save()
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				})
			}
		},
		login: async (root, args) => {
			const user = await User.findOne({ username: args.username })

			if (!user || args.password !== 'secret') {
				throw new UserInputError('wrong credentials')
			}

			const userForToken = {
				username: user.username,
				id: user._id,
			}

			return { value: jwt.sign(userForToken, JWT_SECRET) }
		},
	},

	Author: {
		bookCount: async root => {
			return await Book.countDocuments({ author: root.id })
		},
	},

	Subscription: {
		bookAdded: {
			subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
		},
	},
}

module.exports = resolvers
