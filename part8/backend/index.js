require('dotenv').config()
const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const http = require('http')
const { execute, subscribe } = require('graphql')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const User = require('./models/user')

const JWT_SECRET = process.env.SECRET
const MONGODB_URI = process.env.MONGODB_URI
console.log('connecting to', MONGODB_URI)

mongoose
	.connect(MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('connected to mongodb'))
	.catch(err => console.error(err))

const app = express()
const httpServer = http.createServer(app)

const schema = makeExecutableSchema({ typeDefs, resolvers })

const subscriptionServer = SubscriptionServer.create(
	{ schema, execute, subscribe },
	{ server: httpServer, path: '/graphql' }
)

const server = new ApolloServer({
	schema,
	plugins: [
		{
			async serverWillStart() {
				return {
					async drainServer() {
						subscriptionServer.close()
					},
				}
			},
		},
	],
	context: async ({ req }) => {
		const auth = req ? req.headers.authorization : null

		if (auth && auth.toLowerCase().startsWith('bearer ')) {
			const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
			const currentUser = await User.findById(decodedToken.id)
			return { currentUser }
		}
	},
})

server.start().then(() => {
	server.applyMiddleware({
		app,
	})

	const PORT = 4000
	httpServer.listen(PORT, () => {
		console.log(`Server ready at http://localhost:${PORT}/graphql`)
	})
})
