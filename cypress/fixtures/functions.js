export function log_user(){
     cy.visit('http://127.0.0.1:5000/sign_in')


            cy.get('[data-cy=email]')
                .type('testuser@user.com').should('have.value', 'testuser@user.com')

            cy.get('[data-cy=password]')
                .type('password').should('have.value', 'password')


            cy.get('[data-cy=feelometer]').should('be.visible').invoke('val', 77)
                .trigger('change');

            cy.get('[data-cy=sign_in]')
                .should('be.visible')
                .click();
}