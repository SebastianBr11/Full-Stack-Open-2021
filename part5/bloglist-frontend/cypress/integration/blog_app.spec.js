describe('Blog app', function () {
	beforeEach(function () {
		cy.request('POST', 'http://localhost:3003/api/testing/reset')

		const user = { name: 'Matt Engarde', username: 'matt', password: 'corrida' }
		cy.request('POST', 'http://localhost:3003/api/users/', user)

		cy.visit('http://localhost:3000')
	})

	it('Login form is shown', function () {
		cy.get('#username')
		cy.get('#password')
		cy.contains('login')
	})

	describe('Login', function () {
		it('succeeds with correct credentials', function () {
			cy.get('#username').type('matt')
			cy.get('#password').type('corrida')
			cy.get('button[type=submit]').contains('login').click()

			cy.get('.notification.success')
		})

		it('fails with wrong credentials', function () {
			cy.get('#username').type('matt')
			cy.get('#password').type('engarde')
			cy.get('button[type=submit]').contains('login').click()

			cy.get('.notification.error').should(
				'have.css',
				'color',
				'rgb(255, 0, 0)'
			)
		})
	})

	describe('When logged in', function () {
		beforeEach(function () {
			cy.login({ username: 'matt', password: 'corrida' })
		})

		it('A blog can be created', function () {
			cy.contains('create new blog').click()
			cy.get('#title').type('a title')
			cy.get('#author').type('an author')
			cy.get('#url').type('http://test.com')
			cy.get('#submit').click()

			cy.wait(100)

			cy.request('GET', 'http://localhost:3003/api/blogs').then(response =>
				expect(response.body).to.have.length(1)
			)
		})

		describe('When one blog exists', function () {
			beforeEach(function () {
				cy.createBlog({
					title: 'a cool title',
					author: 'a cool author',
					url: 'http://cool.com',
				}).reload() // Need the reload, as the page still displays old blogs
			})

			it('a blog can be liked', function () {
				cy.get('.details button').click()
				cy.get('.likes button').click()

				cy.request('GET', 'http://localhost:3003/api/blogs').then(response =>
					expect(response.body[0].likes).to.equal(1)
				)
			})
		})
	})
})
