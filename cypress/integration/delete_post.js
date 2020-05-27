import {log_user} from "../fixtures/functions.js";

describe('Deleting post', () => {


    beforeEach(() => {
        Cypress.Cookies.preserveOnce('session', '__cfduid')

    });
    it(
        'it should sign in user',
        () => {
            /*LOG USER IN*/
            log_user()


        })
    it(
        'it should delete post',
        () => {
            /*UPDATE  POST*/
            cy.get('[data-cy=my_posts]')
                .should('be.visible')
                .click();
cy.wait(2000)
            cy.get('[data-cy=delete_post1]')
                .should('be.visible')
                .click();
cy.wait(2000)
            cy.get('.cy-delete-post')
                .should('be.visible')
                .click();


            cy.wait(2000)
            cy.get('[data-cy=my_posts]')
                .should('be.visible')
                .click();
            cy.wait(2000)
            cy.get('[data-cy=user_posts]').scrollIntoView()
            cy.wait(2000)

        })
})