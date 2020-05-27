


describe ( 'Creating new user', () =>
{

    it (
		'it should create new user',
		() =>
		{
            cy.visit ( 'http://127.0.0.1:5000/sign_up' )


            cy.get ( '[data-cy=svg_map]' )
				                          .should ( 'be.visible' )
				                          .click () ;

             cy.wait ( 2000 );
              cy.get ( '[data-cy=svg_map]' )
				                          .should ( 'be.visible' )
				                          .click () ;
              cy.get('#Nasarawa') .should ( 'be.visible' )
				                          .click () ;
               cy.wait ( 2000 );

                 cy.get ( '[data-cy=username]' )
      		.type('testuser').should('have.value', 'testuser')

			cy.get ( '[data-cy=email]' )
      		.type('testuser@user.com').should('have.value', 'testuser@user.com')

			cy.get ( '[data-cy=password]' )
      		.type('password').should('have.value', 'password')


			cy.get ( '[data-cy=sign_up]' )
      		.should ( 'be.visible' )
				                          .click () ;




        })


})

