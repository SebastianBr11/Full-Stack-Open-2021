const express = require('express')
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)

module.exports = app
