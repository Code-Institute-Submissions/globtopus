import {log_user} from "../fixtures/functions";

describe('Removing post from user\'s favourites', () => {
    beforeEach(() => {
        Cypress.Cookies.preserveOnce('session', '__cfduid')

    });

    it(
        'it should sign in user',
        () => {

            log_user()


        })
    it(
        'it should remove the post from user\' favourites',
        () => {


            cy.get('[data-cy=my_fav]')
                .should('be.visible')
                .scrollIntoView()
                .wait(1000)
                .click();

            cy.get('[data-cy=delete_post1]')
                .should('be.visible')
                .scrollIntoView()
                .wait(1000)
                .click();

            cy.get('.cy-delete-fav')
                .should('be.visible')
                .click();


            cy.wait(2000)

            cy.get('[data-cy=my_fav]')
                .should('be.visible')
                .scrollIntoView()
                .wait(1000)
                .click();


        })
})