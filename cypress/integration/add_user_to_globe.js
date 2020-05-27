import {log_user} from "../fixtures/functions";

describe('Adding other user to globe', () => {
    beforeEach(() => {
        Cypress.Cookies.preserveOnce('session', '__cfduid')

    });

    it(
        'it should sign in user',
        () => {

            log_user()


        })
    it(
        'it should add other user to logged in user\'s globe',
        () => {


            cy.get('[data-cy=add_user1]')
                .should('be.visible')
                .scrollIntoView()
                .wait(1000)
                .click();


            cy.get('[data-cy=my_globe]')
                .should('be.visible')
                .scrollIntoView()
                .wait(1000)
                .click();

            cy.get('[data-cy=globber]')
                .should('be.visible')

                .wait(1000)
                .click({multiple: true, force: true});


        })
})