const jwt = require('jsonwebtoken')
const User = require('../models/user')
const logger = require('./logger')

const errorHandler = (error, request, response, next) => {
  console.log('hi', error)
  logger.error(error.message)

  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token',
    })
  }

  next(error)
}

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

const tokenExtractor = (request, response, next) => {
  request.token = getTokenFrom(request)

  next()
}

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (!user._id) {
    return response.status(404).json({ error: "Couldn't find user" })
  }

  request.user = user

  next()
}

module.exports = {
  errorHandler,
  tokenExtractor,
  userExtractor,
}
