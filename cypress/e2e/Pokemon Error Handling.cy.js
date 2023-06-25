/// <reference types="cypress" />

import INTERCEPT from '../support/interceptors';

describe('Pokemon Error Handling', () => {
  it('displays 404 page', () => {
    cy.visit('/pokemon/nope');
    cy.getByTestId('error-boundary').should('exist');
    cy.contains('404');
    cy.get('a').click();
    cy.url().should('match', /\/pokemon$/);
  });

  it('displays 404 page from details url', () => {
    cy.on('uncaught:exception', () => {
      return false;
    });
    cy.visit('/pokemon/character/badid', { failOnStatusCode: false });
    cy.getByTestId('error-boundary').should('exist');
    cy.get('a').click();
    cy.url().should('match', /\/pokemon$/);
  });

  it('displays 500 error page', () => {
    cy.on('uncaught:exception', () => {
      return false;
    });

    INTERCEPT.getPage.intercept();
    cy.visit('/pokemon');
    cy.wait(INTERCEPT.getPage.alias);

    INTERCEPT.getPage.intercept({
      statusCode: 500,
    });
    cy.getByTestId('layout-view-buttons').find('[aria-label="List View"]').click();
    cy.getByTestId('error-boundary').should('exist');
    cy.contains('Error');

    INTERCEPT.getPage.intercept((req) => {
      req.continue();
    });
    cy.get('a').click();
    cy.wait(INTERCEPT.getPage.alias);
    cy.getByTestId('pokemon-vertical-card').should('have.length', 16, { timeout: 5000 });
  });
});
