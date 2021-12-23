import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UsersView = () => {
	const users = useSelector(state => state.users)
	return (
		<div>
			<h1>Users</h1>
			<table>
				<thead>
					<tr>
						<th></th>
						<th className='p-4'>blogs created</th>
					</tr>
				</thead>
				<tbody>
					{users.map(user => (
						<tr key={user.id}>
							<td className='p-4'>
								<Link to={`/users/${user.id}`}>{user.name}</Link>
							</td>
							<td className='p-4'>{user.blogs.length}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default UsersView
