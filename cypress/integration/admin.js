import {log_user} from "../fixtures/functions.js";

describe ( 'Signing in as Admin and deleting post permanently and returning post back to search results', () =>
{

  beforeEach ( () =>
	             {
		             Cypress.Cookies.preserveOnce('session', '__cfduid')

	             } );


	it (
		'it should sign in as admin',
		() =>
		{

			cy.visit ( 'http://127.0.0.1:5000/sign_in' )





			cy.get ( '[data-cy=email]' )
      		.type('marcel@globi.com').should('have.value', 'marcel@globi.com')

			cy.get ( '[data-cy=password]' )
      		.type('password').should('have.value', 'password')


			cy.get ( '[data-cy=feelometer]' ).should ( 'be.visible' ).invoke('val', 77)
                .trigger('change');

			cy.get ( '[data-cy=sign_in]' )
      		.should ( 'be.visible' )
				                          .click () ;

			cy.wait(2000)

        })

	it('it should delete post permanently',  () => {

				cy.get ( '[data-cy=delete_flagged1]' )
      		.should ( 'be.visible' )
				                          .click () ;

			cy.wait(2000)
				cy.get ( '.cy-confirm' )
      		.should ( 'be.visible' )
				                          .click () ;

			cy.get ( '#dashboard' )
      		.should ( 'be.visible' )
				.scrollIntoView()

	});

	it('it should return post back to search results', function () {
		cy.wait(2000)
			cy.get ( '[data-cy=return_flagged2]' )
      		.should ( 'be.visible' )
				                          .click () ;

			cy.wait(2000)
				cy.get ( '.cy-confirm' )
      		.should ( 'be.visible' )
				                          .click () ;

				cy.get ( '#dashboard' )
      		.should ( 'be.visible' )
				.scrollIntoView()
	});
})