import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { initializeBlogs, addBlog, likeBlog } from './reducers/blogReducer'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const blogs = useSelector(state => state.blogs)
	const wholeState = useSelector(state => state)
	console.log(wholeState)
	const dispatch = useDispatch()
	// const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)

	const [notification, setNotification] = useState(null)

	const blogFormRef = useRef()

	useEffect(() => {
		async function getAndSetBlogs() {
			dispatch(initializeBlogs())
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
			{notification && (
				<Notification message={notification.msg} type={notification.type} />
			)}
			<form onSubmit={handleLogin}>
				<div>
					username
					<input
						type='text'
						id='username'
						value={username}
						name='Username'
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					password
					<input
						type='password'
						id='password'
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

			window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
			setNotification({ type: 'success', msg: 'Successfully logged in !' })
			setTimeout(() => setNotification(null), 5000)
		} catch (exception) {
			console.log('error', exception)
			setNotification({ type: 'error', msg: exception.response.data.error })
			setTimeout(() => setNotification(null), 5000)
		}
	}

	const handleLogout = () => {
		window.localStorage.clear()
		setUser(null)
	}

	const createBlog = async blog => {
		try {
			blogFormRef.current.toggleVisibility()

			setNotification({
				type: 'success',
				msg: `a new blog ${blog.title} by ${blog.author} added`,
			})
			setTimeout(() => setNotification(null), 5000)
			dispatch(addBlog(blog))
		} catch (exception) {
			console.log('error', exception)
			setNotification({ type: 'error', msg: exception.response.data.error })
			setTimeout(() => setNotification(null), 5000)
		}
	}

	const handleLike = async blog => {
		dispatch(likeBlog(blog.id))
	}

	if (user === null) {
		return loginForm()
	}

	return (
		<div>
			<div>
				<h1>blogs</h1>
				{notification && (
					<Notification message={notification.msg} type={notification.type} />
				)}
				{user.name} logged in
				<button onClick={handleLogout}>logout</button>
			</div>
			<br />
			<Togglable buttonLabel={'create new blog'} ref={blogFormRef}>
				<CreateBlog createBlog={createBlog} />
			</Togglable>
			{blogs.map(blog => (
				<Blog
					key={blog.id}
					blog={blog}
					isSameUser={blog.user.username === user.username}
					handleLike={() => handleLike(blog)}
				/>
			))}
		</div>
	)
}

export default App
