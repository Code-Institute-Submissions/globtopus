import {log_user} from "../fixtures/functions";

describe('Removing other user from globe', () => {
beforeEach ( () =>
	             {
		             Cypress.Cookies.preserveOnce('session', '__cfduid')

	             } );

    it(
        'it will sign in user',
        () => {

              log_user()


        })
    it(
        'it should remove other user from logged in user\'s globe',
        () => {




        cy.get('[data-cy=my_globe]')
                .should('be.visible')
                .scrollIntoView()
                .wait(1000)
                .click();

        cy.get('[data-cy=globber]')
                .should('be.visible')

                .wait(1000)
                .click({ multiple: true,force: true });

         cy.get('[data-cy=remove_from_globe]')
                .should('be.visible')

                .wait(1000)
                .click();

          cy.get('.cy-remove-globber')
                .should('be.visible')

                .wait(1000)
                .click();
          
           cy.get('[data-cy=my_globe]')
                .should('be.visible')
                .scrollIntoView()
                .wait(1000)
                .click();



        })
})