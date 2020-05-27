import {log_user} from "../fixtures/functions";

describe('Removing post from user\'s feelist', () => {
    beforeEach(() => {
        Cypress.Cookies.preserveOnce('session', '__cfduid')

    });

    it(
        'it will sign in user',
        () => {

            log_user()


        })
    it(
        'it should remove the post from user\' feelist',
        () => {


            cy.get('[data-cy=my_feelist]')
                .should('be.visible')
                .scrollIntoView()
                .wait(1000)
                .click();

            cy.get('[data-cy=feelist1]')
                .should('be.visible')
                .scrollIntoView()
                .wait(1000)
                .click();

            cy.get('[data-cy=delete_post1]')
                .should('be.visible')
                .scrollIntoView()
                .wait(1000)
                .click();

            cy.get('.cy-delete-from-feelist')
                .should('be.visible')
                .click();


            cy.wait(2000)

            cy.get('[data-cy=my_feelist]')
                .should('be.visible')
                .scrollIntoView()
                .wait(1000)
                .click();


            cy.get('[data-cy=u_feelists]')
                .should('be.visible')
                .scrollIntoView()


        })
})