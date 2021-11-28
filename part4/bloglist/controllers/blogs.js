const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', userExtractor, async (request, response) => {
  const newBlog = { ...request.body }
  if (!newBlog.likes) {
    newBlog.likes = 0
  }

  console.log('new blog', newBlog)

  if (!newBlog.title && !newBlog.url) {
    return response.status(400).json({ error: 'Missing Title and Url' })
  }

  const user = request.user

  newBlog.user = user._id

  const blog = new Blog(newBlog)
  const result = await blog.save()

  user.blogs = user.blogs.concat(result._id)
  await user.save()

  response.status(201).json(result)
})

blogRouter.delete('/:id', userExtractor, async (req, res) => {
  const exists = await Blog.exists({ _id: req.params.id }).catch(err => err)

  if (exists?.message) {
    return res.status(400).json({ error: exists.message }).end()
  }

  if (!exists) {
    return res.status(404).end()
  }

  const user = req.user

  const blog = await Blog.findById(req.params.id)

  if (blog.user.toString() !== user._id.toString()) {
    return res.status(401).json({ error: 'No user permissions' })
  }

  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

blogRouter.put('/:id', async (req, res) => {
  const post = {
    likes: req.body.likes,
  }

  const newPost = await Blog.findByIdAndUpdate(req.params.id, post, {
    new: true,
  }).catch(err => err)

  if (newPost?.message) {
    return res.status(400).json({ error: newPost.message }).end()
  }

  if (!newPost) {
    return res.status(404).end()
  }

  res.json(newPost)
})

module.exports = blogRouter
