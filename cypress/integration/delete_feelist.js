import {log_user} from "../fixtures/functions";

describe('Deleting feelist', () => {
    beforeEach(() => {
        Cypress.Cookies.preserveOnce('session', '__cfduid')

    });

    it(
        'it should sign in user',
        () => {

            log_user()


        })
    it(
        'it should delete feelist',
        () => {


              cy.get('[data-cy=my_feelist]')
                .should('be.visible')
                .scrollIntoView()
                .wait(1000) .click();

                cy.get('[data-cy=feelist1]')
                .should('be.visible')
                .scrollIntoView()
                .wait(1000) .click();


                cy.get('[data-cy=delete_feelist]')
                .should('be.visible')
                .scrollIntoView()
                .wait(1000) .click();

                cy.get('.cy-remove-feelist')
                .should('be.visible')
                .scrollIntoView()
                .wait(1000) .click();

                cy.wait(2000)
              cy.get('[data-cy=my_feelist]')
                .should('be.visible')
                .scrollIntoView()
                .wait(1000) .click();


               cy.get('[data-cy=u_feelists]')
                .should('be.visible')
                .scrollIntoView()








        })
})