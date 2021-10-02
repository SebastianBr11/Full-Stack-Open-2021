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

module.exports = {
  errorHandler,
  tokenExtractor,
}
