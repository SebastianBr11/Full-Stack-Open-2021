import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Notification from './components/Notification'
import { initializeBlogs } from './reducers/blogsReducer'
import {
	setErrorNotification,
	setSuccessNotification,
} from './reducers/notificationReducer'
import { setUser, initUser } from './reducers/loginReducer'
import loginService from './services/login'
import { initializeUsers } from './reducers/usersReducer'
import UsersView from './components/UsersView'
import BlogView from './components/BlogView'
import UserInfo from './components/UserInfo'
import Blog from './components/Blog'
import NavBar from './components/NavBar'

const App = () => {
	const blogs = useSelector(state => state.blogs)
	const users = useSelector(state => state.users)
	const notification = useSelector(state => state.notification)
	const loggedInUser = useSelector(state => state.loggedInUser)

	const dispatch = useDispatch()

	const userMatch = useRouteMatch('/users/:id')
	const matchedUser = userMatch
		? users.find(user => user.id === userMatch.params.id)
		: null

	const blogMatch = useRouteMatch('/blogs/:id')
	const matchedBlog = blogMatch
		? blogs.find(blog => blog.id === blogMatch.params.id)
		: null

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	useEffect(() => {
		dispatch(initUser())
		dispatch(initializeBlogs())
		dispatch(initializeUsers())
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

	if (loggedInUser === null) {
		return loginForm()
	}

	return (
		<main className='container p-2 m-bl-0'>
			<NavBar />
			<h1>blog app</h1>
			{notification && (
				<Notification message={notification.msg} type={notification.type} />
			)}
			<Switch>
				<Route path='/users/:id'>
					<UserInfo user={matchedUser} />
				</Route>
				<Route path='/users'>
					<UsersView />
				</Route>
				<Route path='/blogs/:id'>
					<Blog blog={matchedBlog} />
				</Route>
				<Route path='/'>
					<BlogView />
				</Route>
			</Switch>
		</main>
	)
}

export default App
