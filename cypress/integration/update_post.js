import {log_user} from "../fixtures/functions.js";

describe('Updating existing post', () => {


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
        'it should update post',
        () => {
            /*UPDATE  POST*/
            cy.get('[data-cy=my_posts]')
                .should('be.visible')
                .click();

            cy.get('[data-cy=edit_post1]')
                .should('be.visible')
                .click();

            cy.get('[data-cy=i_feel]').clear()
                .type('Great updated').should('have.value', 'Great updated')

            cy.get('[data-cy=because]').clear()
                .type('I am almost done with the third milestone project updated')
                .should('have.value', 'I am almost done with the third milestone project updated')


            cy.get('[data-cy=action]').clear()
                .type('Learn new things every day updated').should('have.value', 'Learn new things every day updated')


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