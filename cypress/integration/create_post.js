import {log_user} from "../fixtures/functions.js";

describe('Creating new post', () => {


    beforeEach(() => {
        Cypress.Cookies.preserveOnce('session', '__cfduid')

    });
    it(
        'it should log in user',
        () => {
            /*LOG USER IN*/
            log_user()


        })
    it(
        'it should create new post',
        () => {
            /*CREATE NEW POST*/
            cy.get('[data-cy=my_posts]')
                .should('be.visible')
                .click();

            cy.get('[data-cy=create_new_post]')
                .should('be.visible')
                .click();

            cy.get('[data-cy=i_feel]')
                .type('Great').should('have.value', 'Great')

            cy.get('[data-cy=because]')
                .type('I am almost done with the third milestone project')
                .should('have.value', 'I am almost done with the third milestone project')


            cy.get('[data-cy=action]')
                .type('Learn new things every day').should('have.value', 'Learn new things every day')


            cy.get('[data-cy=post_action]')
                .should('be.visible')
                .click();


            cy.wait(2000)
            cy.get('[data-cy=my_posts]')
                .should('be.visible')
                .click();
            cy.get('[data-cy=user_posts]').scrollIntoView()

        })
})