const UserInfo = ({ user }) => {
	if (!user) return null

	return (
		<div className='text-gray-300'>
			<h1>{user.name}</h1>
			<h2 className='text-gray-300'>added blogs</h2>
			<ul className='flex flex-col gap-1'>
				{user.blogs.map(blog => (
					<li key={blog.id}>{blog.title}</li>
				))}
			</ul>
		</div>
	)
}

export default UserInfo
