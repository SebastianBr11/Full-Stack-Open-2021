import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { initializeBlogs, addBlog, likeBlog } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const blogs = useSelector(state => state.blogs)
	const notification = useSelector(state => state.notification)
	const user = useSelector(state => state.user)

	const dispatch = useDispatch()

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)

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
			dispatch(
				setNotification({ type: 'success', msg: 'Successfully logged in !' })
			)
		} catch (exception) {
			console.log('error', exception)
			dispatch(
				setNotification({ type: 'error', msg: exception.response.data.error })
			)
		}
	}

	const handleLogout = () => {
		window.localStorage.clear()
		setUser(null)
	}

	const createBlog = async blog => {
		dispatch(addBlog(blog))
		blogFormRef.current.toggleVisibility()
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
