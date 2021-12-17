describe('Blog app', function () {
	beforeEach(function () {
		cy.request('POST', 'http://localhost:3003/api/testing/reset')

		cy.createUser({
			name: 'Matt Engarde',
			username: 'matt',
			password: 'corrida',
		})

		cy.createUser({
			name: 'Juan Corrida',
			username: 'juan',
			password: 'engarde',
		})

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

			cy.wait(50) // Without wait, the request would not have newest response

			cy.request('GET', 'http://localhost:3003/api/blogs').then(response =>
				expect(response.body).to.have.length(1)
			)
		})

		describe('When one blog exists', function () {
			let blog

			beforeEach(function () {
				cy.createBlog({
					title: 'a cool title',
					author: 'a cool author',
					url: 'http://cool.com',
				})
					.then(({ body }) => (blog = body))
					.reload() // Need the reload, as the page still displays old blogs
			})

			it('a blog can be liked', function () {
				cy.get('.details button').click()
				cy.get('.likes button').click()

				cy.contains('likes').should('include.text', blog.likes + 1)
				cy.request('GET', 'http://localhost:3003/api/blogs').then(response =>
					expect(response.body[0].likes).to.eq(blog.likes + 1)
				)
			})

			it('a blog can be deleted by its creator', function () {
				cy.get('.details button').click()
				cy.contains('remove').click()

				cy.wait(50)

				cy.request('GET', 'http://localhost:3003/api/blogs').then(response =>
					expect(response.body).to.have.length(0)
				)
			})

			it('a blog can not be deleted by user who is not creator', function () {
				cy.login({ username: 'juan', password: 'engarde' })
				cy.deleteBlog(blog.id).then(response =>
					expect(response.status).to.eq(401)
				)
			})

			it('the blogs are ordered according to likes with the blog with the most likes being first', function () {
				const blogs = [5, 2, 4, 3, 1].map(num => ({
					title: 'title',
					author: 'author',
					url: 'http://t.t',
					likes: num,
				}))

				const orderedBlogs = [...blogs, blog].sort((a, b) => b.likes - a.likes)

				blogs.forEach(blog => {
					cy.createBlog(blog)
				})

				cy.wait(50)

				cy.reload()
				cy.get('.details button').each(button => button.click())
				cy.get('.likes > span').each((likeSpan, i) =>
					cy.wrap(likeSpan).should('have.text', orderedBlogs[i].likes)
				)
			})
		})
	})
})
