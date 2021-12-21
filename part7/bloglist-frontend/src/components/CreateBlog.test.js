import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import CreateBlog from './CreateBlog'

describe('<CreateBlog />', () => {

	let component

	let blog

	const createBlog = (newBlog) => {
		blog = newBlog
	}

	beforeEach(() => {
		component = render(
			<CreateBlog createBlog={createBlog} />
		)
	})

	test('form calls event handler with correct values', () => {
		pressCreateButton(component)

		const titleInput = component.container.querySelector('#title')
		fireEvent.change(titleInput, {
			target: { value: 'My Title' }
		})

		const authorInput = component.container.querySelector('#author')
		fireEvent.change(authorInput, {
			target: { value: 'My Author' }
		})

		const urlInput = component.container.querySelector('#url')
		fireEvent.change(urlInput, {
			target: { value: 'https://test.com' }
		})

		const form = component.container.querySelector('form')
		fireEvent.submit(form)

		expect(blog.title).toBe('My Title')
		expect(blog.author).toBe('My Author')
		expect(blog.url).toBe('https://test.com')
	})
})

function pressCreateButton(component) {
	const button = component.container.querySelector('button[type=submit]')

	fireEvent.click(button)
}