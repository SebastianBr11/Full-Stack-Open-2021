import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UsersView = () => {
	const users = useSelector(state => state.users)
	return (
		<div>
			<h1>Users</h1>
			<table>
				<tr>
					<th></th>
					<th>blogs created</th>
				</tr>
				{users.map(user => (
					<tr key={user.id}>
						<td>
							<Link to={`/users/${user.id}`}>{user.name}</Link>
						</td>
						<td>{user.blogs.length}</td>
					</tr>
				))}
			</table>
		</div>
	)
}

export default UsersView
