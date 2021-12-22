const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', {
    url: 1,
    title: 1,
    author: 1,
  })
  res.json(users)
})

usersRouter.post('/', async (req, res) => {
  const body = req.body

  if (!body.password) {
    return res.status(400).json({ error: 'Password is required' })
  }
  if (body.password.length < 3) {
    return res
      .status(400)
      .json({ error: 'Password must have at least 3 characters' })
  }

  const saltRounds = 10
  const password = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    password,
  })

  try {
    const savedUser = await user.save()
    res.status(201).json(savedUser)
  } catch (e) {
    // console.error(e)
    res.status(400).json({ error: e.message })
  }
})

module.exports = usersRouter
