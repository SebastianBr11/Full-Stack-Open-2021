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
})
