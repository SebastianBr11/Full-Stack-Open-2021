import {
	setErrorNotification,
	setSuccessNotification,
} from './notificationReducer'
import blogService from '../services/blogs'

const reducer = (state = [], action) => {
	switch (action.type) {
		case 'INIT_BLOGS':
			return action.payload
		case 'ADD_BLOG':
			return [...state, action.payload]
		case 'UPDATE_BLOG':
			return state.map(blog =>
				blog.id === action.payload.id ? { ...blog, ...action.payload } : blog
			)
		case 'DELETE_BLOG':
			return state.filter(blog => blog.id !== action.payload.id)
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
		try {
			const newBlog = await blogService.create(blog)
			console.log('new', newBlog)
			dispatch({
				type: 'ADD_BLOG',
				payload: newBlog,
			})
			dispatch(
				setSuccessNotification(
					`a new blog ${newBlog.title} by ${newBlog.author} added`,
					5
				)
			)
		} catch (exception) {
			console.log('error', exception)
			dispatch(setErrorNotification(exception.response.data.error, 5))
		}
	}
}

export const likeBlog = id => {
	return async (dispatch, getState) => {
		const blog = getState().blogs.find(blog => blog.id === id)
		const blogToUpdate = { ...blog, likes: blog.likes + 1 }
		try {
			const newBlog = await blogService.update(blogToUpdate, blog.id)
			dispatch({
				type: 'UPDATE_BLOG',
				payload: { likes: newBlog.likes, id },
			})
			dispatch(sortBlogs())
		} catch (exception) {
			console.log('error', exception)
			dispatch(setErrorNotification(exception.response.data.error, 5))
		}
	}
}

export const deleteBlog = id => {
	return async dispatch => {
		try {
			await blogService.remove(id)
			dispatch({
				type: 'DELETE_BLOG',
				payload: { id },
			})
		} catch (exception) {
			console.log('error', exception.response.data.error)
			dispatch(setErrorNotification(exception.response.data.error))
		}
	}
}

export default reducer
