const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const newBlog = { ...request.body }
  if (!newBlog.likes) {
    newBlog.likes = 0
  }

  console.log('new blog', newBlog)

  if (!newBlog.title && !newBlog.url) {
    return response.status(400).json({ error: 'Missing Title and Url' })
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (!user._id) {
    return response.status(404).json({ error: "Couldn't find user" })
  }

  newBlog.user = user._id

  const blog = new Blog(newBlog)
  const result = await blog.save()

  user.blogs = user.blogs.concat(result._id)
  await user.save()

  response.status(201).json(result)
})

blogRouter.delete('/:id', async (req, res) => {
  const exists = await Blog.exists({ _id: req.params.id }).catch(err => err)

  if (exists?.message) {
    return res.status(400).json({ error: exists.message }).end()
  }

  if (!exists) {
    return res.status(404).end()
  }

  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (!user._id) {
    return res.status(404).json({ error: "Couldn't find user" })
  }

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
