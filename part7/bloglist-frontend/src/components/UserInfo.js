import { useSelector } from 'react-redux'

const UserInfo = () => {
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
						<td>{user.name}</td>
						<td>{user.blogs.length}</td>
					</tr>
				))}
			</table>
		</div>
	)
}

export default UserInfo
