import {log_user} from "../fixtures/functions";

describe('Adding post to user\'s favourites', () => {
    beforeEach(() => {
        Cypress.Cookies.preserveOnce('session', '__cfduid')

    });

    it(
        'it should sign in user',
        () => {

            log_user()


        })
    it(
        'it should add the post to user\'s favourites',
        () => {


            cy.get('[data-cy=like_post2]')
                .should('be.visible')
                .scrollIntoView()
                .wait(1000)
                .click();

            cy.get('[data-cy=my_fav]')
                .should('be.visible')
                .scrollIntoView()
                .wait(1000)
                .click();


        })
})