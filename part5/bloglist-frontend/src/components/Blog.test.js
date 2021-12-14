import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author', () => {
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

	const component = render(
		<Blog blog={blog} isSameUser={true} />
	)

	const div = component.container.querySelector('.blog > div')

	expect(div).toHaveTextContent(
		'Test-title test author'
	)

	expect(component.container.childElementCount).toBe(1)
})