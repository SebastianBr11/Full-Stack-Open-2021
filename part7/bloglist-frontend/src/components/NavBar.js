import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { resetUser } from '../reducers/loginReducer'

const NavBar = () => {
	const dispatch = useDispatch()
	const loggedInUser = useSelector(state => state.loggedInUser)

	const handleLogout = () => {
		dispatch(resetUser())
	}
	return (
		<nav className='bg-gray'>
			<ul className='flex items-center  m-0 p-0 p-2 gap-2 list-none'>
				<li>
					<Link to='/'>blogs</Link>
				</li>
				<li>
					<Link to='/users'>users</Link>
				</li>
				<li>{loggedInUser.name} logged in</li>
				<li>
					<button onClick={handleLogout}>logout</button>
				</li>
			</ul>
		</nav>
	)
}

export default NavBar
