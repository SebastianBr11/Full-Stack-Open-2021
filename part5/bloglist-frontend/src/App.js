import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  const loginForm = () => (
    <div>
      <h1>log in to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='text'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )

  const handleLogin = async e => {
    e.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('error', exception)
    }
  }

  if (user === null) {
    return loginForm()
  }

  return (
    <div>
      <div>
        <h1>blogs</h1>
        {user.name} logged in
      </div>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
