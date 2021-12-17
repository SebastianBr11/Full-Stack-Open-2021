Cypress.Commands.add('createUser', ({ name, username, password }) => {
	cy.request('POST', 'http://localhost:3003/api/users/', {
		name,
		username,
		password,
	})
})

Cypress.Commands.add('login', ({ username, password }) => {
	cy.request('POST', 'http://localhost:3003/api/login', {
		username,
		password,
	}).then(({ body }) => {
		localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
		cy.visit('http://localhost:3000')
	})
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
	if (!localStorage.getItem('loggedBlogappUser')) return

	const user = JSON.parse(localStorage.getItem('loggedBlogappUser'))

	return cy.request({
		method: 'POST',
		url: 'http://localhost:3003/api/blogs',
		body: {
			title,
			author,
			url,
		},
		auth: {
			bearer: user.token,
		},
	})
})

Cypress.Commands.add('deleteBlog', id => {
	if (!localStorage.getItem('loggedBlogappUser')) return

	const user = JSON.parse(localStorage.getItem('loggedBlogappUser'))

	return cy.request({
		method: 'DELETE',
		url: 'http://localhost:3003/api/blogs/' + id,
		auth: {
			bearer: user.token,
		},
		failOnStatusCode: false,
	})
})
