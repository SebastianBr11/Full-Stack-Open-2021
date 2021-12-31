require('dotenv').config()
const { ApolloServer } = require('apollo-server')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const User = require('./models/user')

const JWT_SECRET = process.env.SECRET
const MONGODB_URI = process.env.MONGODB_URI
console.log('connecting to', MONGODB_URI)

mongoose
	.connect(MONGODB_URI)
	.then(() => console.log('connected to mongodb'))
	.catch(err => console.error(err))

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({ req }) => {
		const auth = req ? req.headers.authorization : null

		if (auth && auth.toLowerCase().startsWith('bearer ')) {
			const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
			const currentUser = await User.findById(decodedToken.id)
			return { currentUser }
		}
	},
})

server.listen().then(({ url }) => {
	console.log(`Server ready at ${url}`)
})
