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

	cy.request({
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
