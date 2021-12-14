import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, prettyDOM } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {

	let component

	const blog = {
		title: 'Test-title',
		author: 'test author',
		url: 'https://test.com',
		likes: '0',
		user: {
			username: 'username1',
			name: 'name1',
			id: '123456789',
		},
		id: '123456789',
	}

	beforeEach(() => {
		component = render(
			<Blog blog={blog} isSameUser={true} />
		)
	})


	test('renders title and author, but not the other stuff by default', () => {
		const div = component.container.querySelector('.blog > div')

		expect(div).toHaveTextContent(
			'Test-title test author'
		)

		expect(component.container.childElementCount).toBe(1)
	})

	test('shows blog url and likes when button is clicked', () => {
		const button = component.container.querySelector('button')

		fireEvent.click(button)

		//const div = component.container.querySelectorAll('.blog')[1]
		const div = component.container.querySelectorAll('div > div')
		div.forEach(d => console.log(prettyDOM(d)))

		//console.log(prettyDOM(div))

		// expect(div.children[0].textContent).toBe(blog.url)
		// expect(div.children[1].textContent).toBe('likes ' + blog.likes)
	})
})