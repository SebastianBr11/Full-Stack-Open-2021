import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { initializeBlogs, addBlog, likeBlog } from './reducers/blogReducer'
import {
	setErrorNotification,
	setSuccessNotification,
} from './reducers/notificationReducer'
import { resetUser, setUser, initUser } from './reducers/userReducer'
import loginService from './services/login'

const App = () => {
	const blogs = useSelector(state => state.blogs)
	const notification = useSelector(state => state.notification)
	const user = useSelector(state => state.user)

	const dispatch = useDispatch()

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const blogFormRef = useRef()

	useEffect(() => {
		dispatch(initializeBlogs())
	}, [])

	useEffect(() => {
		dispatch(initUser())
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
			dispatch(setUser(user))
			setUsername('')
			setPassword('')
			dispatch(setSuccessNotification('Successfully logged in !'))
		} catch (exception) {
			console.log('error', exception)
			dispatch(setErrorNotification(exception.response.data.error))
		}
	}

	const handleLogout = () => {
		window.localStorage.clear()
		dispatch(resetUser())
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
