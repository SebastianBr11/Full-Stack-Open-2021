const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs)
  })
})

blogRouter.post('/', (request, response) => {
  const newBlog = { ...request.body }
  if (!newBlog.likes) {
    newBlog.likes = 0
  }

  console.log('new blog', newBlog)

  if (!newBlog.title && !newBlog.url) {
    return response.status(400).json({ error: 'Missing Title and Url' })
  }

  const blog = new Blog(newBlog)

  blog.save().then(result => {
    response.status(201).json(result)
  })
})

blogRouter.delete('/:id', async (req, res) => {
  const exists = await Blog.exists({ _id: req.params.id }).catch(err => err)

  if (exists?.message) {
    return res.status(400).json({ error: exists.message }).end()
  }

  if (!exists) {
    return res.status(404).end()
  }

  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

module.exports = blogRouter
