import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import Notification from './components/Notification'
import { initializeBlogs } from './reducers/blogsReducer'
import {
	setErrorNotification,
	setSuccessNotification,
} from './reducers/notificationReducer'
import { resetUser, setUser, initUser } from './reducers/loginReducer'
import loginService from './services/login'
import { initializeUsers } from './reducers/usersReducer'
import UserInfo from './components/UserInfo'
import BlogView from './components/BlogView'

const App = () => {
	const notification = useSelector(state => state.notification)
	const loggedInUser = useSelector(state => state.loggedInUser)

	const dispatch = useDispatch()

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

	const handleLogout = () => {
		window.localStorage.clear()
		dispatch(resetUser())
	}

	if (loggedInUser === null) {
		return loginForm()
	}

	return (
		<div>
			<div>
				<h1>blogs</h1>
				{notification && (
					<Notification message={notification.msg} type={notification.type} />
				)}
				<p>{loggedInUser.name} logged in</p>
				<button onClick={handleLogout}>logout</button>
			</div>
			<Switch>
				<Route path='/users'>
					<UserInfo />
				</Route>
				<Route path='/'>
					<BlogView />
				</Route>
			</Switch>
		</div>
	)
}

export default App
