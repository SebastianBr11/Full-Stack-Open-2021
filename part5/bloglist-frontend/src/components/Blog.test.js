import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {

	let component

	const blog = {
		title: 'Test-title',
		author: 'test author',
		url: 'https://test.com',
		likes: 0,
		user: {
			username: 'username1',
			name: 'name1',
			id: '123456789',
		},
		id: '123456789',
	}

	const handleLike = () => {
		blog.likes++
	}

	beforeEach(() => {
		component = render(
			<Blog blog={blog} isSameUser={true} handleLike={handleLike} />
		)
	})


	test('renders title and author, but not the other stuff by default', () => {
		const div = component.container.querySelector('.blog > div')

		expect(div).toHaveTextContent(
			blog.title + ' ' + blog.author
		)

		expect(component.container.childElementCount).toBe(1)
	})

	test('shows blog url and likes when button is clicked', () => {
		pressViewButton(component)

		const urlContainer = component.container.querySelector('.url')
		expect(urlContainer).toHaveTextContent(blog.url)

		const likesContainer = component.container.querySelector('.likes')
		expect(likesContainer).toHaveTextContent('likes ' + blog.likes)
	})

	test('button event handler is handled twice when pressed twice', () => {
		pressViewButton(component)

		const likeButton = component.container.querySelector('.likes button')

		const prevLikes = blog.likes

		fireEvent.click(likeButton)
		fireEvent.click(likeButton)

		expect(blog.likes).toBe(prevLikes + 2)
	})
})

function pressViewButton(component) {
	const button = component.container.querySelector('button')

	fireEvent.click(button)
}