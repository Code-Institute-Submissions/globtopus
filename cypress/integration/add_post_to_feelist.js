import {log_user} from "../fixtures/functions";

describe('Adding post to user\'s feelist', () => {
    beforeEach(() => {
        Cypress.Cookies.preserveOnce('session', '__cfduid')

    });

    it(
        'it will sign in user',
        () => {

            log_user()


        })
    it(
        'it should add post to user\'s feelist',
        () => {


            cy.get('[data-cy=add_post2]')
                .should('be.visible')
                .scrollIntoView()
              
                .click();



            cy.get('[data-cy=new_feelist_check]')
                .should('be.visible')
                .scrollIntoView()

                .click();



            cy.get('[data-cy=new_feelist_name]')
                .should('be.visible')
                .scrollIntoView()

                .type('new feelist')
                .should('have.value', 'new feelist');

            cy.wait(2000)

            cy.get('[data-cy=new_feelist_save]')
                .should('be.visible')
                .scrollIntoView()
                .click();


            cy.wait(3000)

            cy.get('[data-cy=my_feelist]')
                .should('be.visible')
                .scrollIntoView()
                .click();

            cy.wait(3000)

            cy.get('[data-cy=feelist1]')
                .should('be.visible')
                .scrollIntoView()
                .click();

            cy.wait(2000)

            cy.get('[data-cy=u_feelists]')
                .should('be.visible')
                .scrollIntoView()
            cy.wait(2000)

        })
})