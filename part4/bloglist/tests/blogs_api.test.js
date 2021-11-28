const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const auth = {}

test('login', loginUser(auth))

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
    .set('Authorization', 'bearer ' + auth.token)
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
    .set('Authorization', 'bearer ' + auth.token)
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
    .set('Authorization', 'bearer ' + auth.token)
    .send({
      author: 'author1',
    })
    .expect(400)
})

test('POST request to /api/blogs responds with 401 if authorization is missing', async () => {
  await api
    .post('/api/blogs')
    .send({
      title: 'good title',
      author: 'good author',
      url: 'good url',
    })
    .expect(401)
})

test('Deleting a blog post works', async () => {
  const id = await (await api.get('/api/blogs')).body[0].id
  await api
    .delete('/api/blogs/' + id)
    .set('Authorization', 'bearer ' + auth.token)
    .expect(204)
})

test("Deleting a blog post with wrong id format doesn't work", async () => {
  await api
    .delete('/api/blogs/5')
    .set('Authorization', 'bearer ' + auth.token)
    .expect(400)
})

test("Deleting a blog post with correct id format but unknown id doesn't work", async () => {
  await api
    .delete('/api/blogs/60d970917009802b4a7b057f')
    .set('Authorization', 'bearer ' + auth.token)
    .expect(404)
})

test('Putting a blog post works', async () => {
  const id = await (await api.get('/api/blogs')).body[0].id
  await api
    .put('/api/blogs/' + id)
    .send({ likes: 5 })
    .expect(200)
})

test("Putting a blog post with wrong id format doesn't work", async () => {
  await api.put('/api/blogs/5').send({ likes: 5 }).expect(400)
})

test("Putting a blog post with correct id format but unknown id doesn't work", async () => {
  await api
    .put('/api/blogs/60d970917009802b4a7b057f')
    .send({ likes: 5 })
    .expect(404)
})
afterAll(() => {
  return mongoose.connection.close()
})

function loginUser(auth) {
  return function (done) {
    api
      .post('/api/login')
      .send({ username: 'user', password: 'password' })
      .expect(200)
      .end(onResponse)

    function onResponse(err, res) {
      if (err) return done(err)
      auth.token = res.body.token
      return done()
    }
  }
}
