import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Togglable from './Togglable'
import CreateBlog from './CreateBlog'
import { addBlog } from '../reducers/blogsReducer'
import { Link } from 'react-router-dom'

const BlogView = () => {
	const dispatch = useDispatch()
	const blogs = useSelector(state => state.blogs)

	const blogFormRef = useRef()

	const createBlog = async blog => {
		dispatch(addBlog(blog))
		blogFormRef.current.toggleVisibility()
	}

	return (
		<div className='flex flex-col gap-2'>
			<Togglable buttonLabel={'create new'} ref={blogFormRef}>
				<CreateBlog createBlog={createBlog} />
			</Togglable>
			{blogs.map(blog => (
				<div key={blog.id} className='blog rounded-sm'>
					<Link to={`/blogs/${blog.id}`}>
						{blog.title} {blog.author}
					</Link>
				</div>
			))}
		</div>
	)
}

export default BlogView
