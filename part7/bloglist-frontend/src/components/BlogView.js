import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Togglable from './Togglable'
import CreateBlog from './CreateBlog'
import Blog from './Blog'
import { addBlog, likeBlog } from '../reducers/blogsReducer'

const BlogView = () => {
	const dispatch = useDispatch()
	const blogs = useSelector(state => state.blogs)
	const loggedInUser = useSelector(state => state.loggedInUser)

	const blogFormRef = useRef()

	const createBlog = async blog => {
		dispatch(addBlog(blog))
		blogFormRef.current.toggleVisibility()
	}

	const handleLike = async blog => {
		dispatch(likeBlog(blog.id))
	}
	return (
		<div>
			<Togglable buttonLabel={'create new blog'} ref={blogFormRef}>
				<CreateBlog createBlog={createBlog} />
			</Togglable>
			{blogs.map(blog => (
				<Blog
					key={blog.id}
					blog={blog}
					isSameUser={blog.user.username === loggedInUser.username}
					handleLike={() => handleLike(blog)}
				/>
			))}
		</div>
	)
}

export default BlogView
