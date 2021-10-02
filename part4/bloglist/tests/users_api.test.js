const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('correct status and response when creating user without username', async () => {
  const lengthBefore = await (await api.get('/api/users')).body.length

  const test = await api
    .post('/api/users')
    .send({ password: '123asdf', name: 'myname' })
    .expect(400)

  expect(test.body.error).toBeDefined()
  expect(test.body.error).toBe(
    'User validation failed: username: Path `username` is required.',
  )

  const lengthAfter = await (await api.get('/api/users')).body.length

  expect(lengthAfter).toBe(lengthBefore)
})

test('correct status and response when creating user without password', async () => {
  const lengthBefore = await (await api.get('/api/users')).body.length

  const test = await api
    .post('/api/users')
    .send({ username: 'username1', name: 'myname' })
    .expect(400)

  expect(test.body.error).toBeDefined()
  expect(test.body.error).toBe('Password is required')

  const lengthAfter = await (await api.get('/api/users')).body.length

  expect(lengthAfter).toBe(lengthBefore)
})

test('correct status and response when username is too short', async () => {
  const lengthBefore = await (await api.get('/api/users')).body.length

  const test = await api
    .post('/api/users')
    .send({ username: 'us', name: 'myname', password: 'pass' })
    .expect(400)

  expect(test.body.error).toBeDefined()
  expect(test.body.error).toBe(
    'User validation failed: username: Path `username` (`us`) is shorter than the minimum allowed length (3).',
  )

  const lengthAfter = await (await api.get('/api/users')).body.length

  expect(lengthAfter).toBe(lengthBefore)
})

test('correct status and response when password is too short', async () => {
  const lengthBefore = await (await api.get('/api/users')).body.length

  const test = await api
    .post('/api/users')
    .send({ username: 'user', name: 'myname', password: 'pa' })
    .expect(400)

  expect(test.body.error).toBeDefined()
  expect(test.body.error).toBe('Password must have at least 3 characters')

  const lengthAfter = await (await api.get('/api/users')).body.length

  expect(lengthAfter).toBe(lengthBefore)
})

test('can create new user', async () => {
  await api
    .post('/api/users')
    .send({ username: 'user', name: 'myname', password: 'password' })
    .expect(201)
})

afterAll(() => {
  return mongoose.connection.close()
})
