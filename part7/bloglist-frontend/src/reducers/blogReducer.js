import blogService from '../services/blogs'

const reducer = (state = [], action) => {
	switch (action.type) {
		case 'INIT_BLOGS':
			return action.payload
		case 'ADD_BLOG':
			return [...state, action.payload]
		case 'UPDATE_BLOG':
			return state.map(a => (a.id === action.payload.id ? action.payload : a))
		case 'SORT_BLOGS':
			return [...state].sort((a, b) => b.likes - a.likes)
		default:
			return state
	}
}

const sortBlogs = () => {
	return {
		type: 'SORT_BLOGS',
	}
}

export const initializeBlogs = () => {
	return async dispatch => {
		const blogs = await blogService.getAll()
		dispatch({
			type: 'INIT_BLOGS',
			payload: blogs,
		})
		dispatch(sortBlogs())
	}
}

export const addBlog = blog => {
	return async dispatch => {
		const newBlog = await blogService.create(blog)
		dispatch({
			type: 'ADD_BLOG',
			payload: newBlog,
		})
	}
}

export const likeBlog = id => {
	return async (dispatch, getState) => {
		const blog = getState().blogs.find(blog => blog.id === id)
		const newBlog = {
			user: blog.user.id,
			likes: blog.likes + 1,
			author: blog.author,
			title: blog.title,
			url: blog.url,
		}
		await blogService.update(newBlog, blog.id)
		dispatch({
			type: 'UPDATE_BLOG',
			payload: { id },
		})
		dispatch(sortBlogs())
	}
}

export default reducer
