describe('Searching for posts', () => {


    it(
        'it should search for post with keyword "good"',
        () => {

            cy.visit('http://127.0.0.1:5000/')


            cy.get('[data-cy=search_results]')
                .then(($empty) => {


//			TYPE IN LOCATION THAT HAVE ROOMS
                    cy.get('[data-cy=search_box]').type('good').should('have.value', 'good')

                    cy.wait(2000);
//			SEARCH FOR THE ROOM
                    cy.get('[data-cy=search]')
                        .should('be.visible')
                        .click();

                    cy.get('[data-cy=search_results]')
                        .should(($not_empty) => {
                            expect(
                                $not_empty.text())
                                .not.to.eq(
                                '');
                        });


                });


        })
})