describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username: 'tony',
      name: 'tony',
      password: '123'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function() {
    cy.contains('Log in to application')
    cy.get('#test-loginForm').contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#test-username').type('tony')
      cy.get('#test-password').type('123')
      cy.contains('login').click()

      cy.contains('tony logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#test-username').type('error')
      cy.get('#test-password').type('error')
      cy.contains('login').click()

      cy.get('.error')
        .contains('invalid username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({username: 'tony', password: '123'})
    })

    it('A blog can be created', function() {
      // cy.createBlog({title: 'tony title', author: 'tony', url: 'tonysoul.site'})

      // console.log(localStorage.getItem('loggedUser'))

      cy.contains('new blog').click()
      cy.get('#title').type('tony title')
      cy.get('#author').type('tony')
      cy.get('#url').type('http://tonysoul.site')
      cy.get('#test-btn').click()

      cy.get('.testDiv').should('have.css', 'display', 'block')
      cy.contains('tony title')
    })


    it('user can be add likes',function(){
      cy.createBlog({title: 'tony title', author: 'tony', url: 'tonysoul.site'})
      
      cy.contains('view').click()
      cy.contains('like').click()

      cy.contains('likes 1')
    })
  })



})
