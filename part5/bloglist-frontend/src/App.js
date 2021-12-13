import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)

	const [successMsg, setSuccessMsg] = useState(null)
	const [errorMsg, setErrorMsg] = useState(null)

	useEffect(() => {
		async function getAndSetBlogs() {
			const newBlogs = await blogService.getAll()
			newBlogs.sort((a, b) => b.likes - a.likes)
			setBlogs(newBlogs)
		}
		getAndSetBlogs()
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const loginForm = () => (
		<div>
			<h1>log in to application</h1>
			{successMsg && <Notification message={successMsg} type="success" />}
			{errorMsg && <Notification message={errorMsg} type="error" />}
			<form onSubmit={handleLogin}>
				<div>
					username
					<input
						type="text"
						value={username}
						name="Username"
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					password
					<input
						type="text"
						value={password}
						name="Password"
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button type="submit">login</button>
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

			window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
			setSuccessMsg('Successfully logged in!')
			setTimeout(() => setSuccessMsg(null), 5000)
		} catch (exception) {
			console.log('error', exception)
			setErrorMsg(exception.response.data.error)
			setTimeout(() => setErrorMsg(null), 5000)
		}
	}

	const handleLogout = () => {
		window.localStorage.clear()
		setUser(null)
	}

	const addBlog = async blog => {
		try {
			const newBlog = await blogService.create(blog)

			setSuccessMsg(`a new blog ${blog.title} by ${blog.author} added`)
			setTimeout(() => setSuccessMsg(null), 5000)
			setBlogs(blogs => blogs.concat(newBlog))
		} catch (exception) {
			console.log('error', exception)
			setErrorMsg(exception.response.data.error)
			setTimeout(() => setErrorMsg(null), 5000)
		}
	}

	if (user === null) {
		return loginForm()
	}

	return (
		<div>
			<div>
				<h1>blogs</h1>
				{successMsg && <Notification message={successMsg} type="success" />}
				{errorMsg && <Notification message={errorMsg} type="error" />}
				{user.name} logged in
				<button onClick={handleLogout}>logout</button>
			</div>
			<br />
			<Togglable buttonLabel={'create new blog'}>
				<CreateBlog createBlog={addBlog} />
			</Togglable>
			{blogs.map(blog => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	)
}

export default App
