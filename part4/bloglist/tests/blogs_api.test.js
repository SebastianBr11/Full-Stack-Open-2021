const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blog posts are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('unique identifier of blog posts is named id', async () => {
  const idOfFirst = await api.get('/api/blogs').expect(res => {
    return res.body[0].id
  })
  expect(idOfFirst).toBeDefined()
})

afterAll(() => {
  mongoose.connection.close()
})
