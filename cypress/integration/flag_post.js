import {log_user} from "../fixtures/functions";

describe('Flagging post as inappropriate', () => {
beforeEach ( () =>
	             {
		             Cypress.Cookies.preserveOnce('session', '__cfduid')

	             } );

    it(
        'it should sign in user',
        () => {

              log_user()


        })
    it(
        'it should flag post as inappropriate',
        () => {




            cy.get('[data-cy=flag_post1]')
                .should('be.visible')
                .scrollIntoView()
                .wait(1000)
                .click();


       



        })
})