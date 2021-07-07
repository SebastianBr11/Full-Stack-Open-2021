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

test('POST request to /api/blogs creates post', async () => {
  const lengthBefore = await (await api.get('/api/blogs')).body.length

  await api
    .post('/api/blogs')
    .send({
      title: 'good title',
      author: 'good author',
      url: 'good url',
      likes: 5,
    })
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const lengthAfter = await (await api.get('/api/blogs')).body.length

  expect(lengthAfter).toBe(lengthBefore + 1)
})

test('POST request to /api/blogs without likes has default of 0', async () => {
  const res = await api
    .post('/api/blogs')
    .send({
      title: 'good title',
      author: 'good author',
      url: 'good url',
    })
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const body = await res.body
  expect(body.likes).toBe(0)
})

test('POST request to /api/blogs responds with 400 if title and url are missing', async () => {
  await api
    .post('/api/blogs')
    .send({
      author: 'author1',
    })
    .expect(400)
})

test('Deleting a blog post works', async () => {
  const id = await (await api.get('/api/blogs')).body[0].id
  await api.delete('/api/blogs/' + id).expect(204)
})

test("Deleting a blog post with wrong id format doesn't work", async () => {
  await api.delete('/api/blogs/5').expect(400)
})

test("Deleting a blog post with correct id format but unknown id doesn't work", async () => {
  await api.delete('/api/blogs60d970917009802b4a7b057f').expect(404)
})

afterAll(() => {
  return mongoose.connection.close()
})
