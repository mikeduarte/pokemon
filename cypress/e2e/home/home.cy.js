/// <reference types="cypress" />

import INTERCEPT from '../../support/interceptors';

describe('Pokemon List Page (Home)', () => {
  beforeEach(() => {
    INTERCEPT.getPage.intercept();
    cy.visit('/pokemon');
    cy.wait(INTERCEPT.getPage.alias);
  });

  it('displays 16 pokemon on load', () => {
    cy.getByTestId('pokemon-vertical-card').should('be.length', 16);
  });

  it('displays more pokemon on scroll', () => {
    cy.getByTestId('pokemon-vertical-card').as('cards');
    INTERCEPT.getPage.intercept();
    cy.get('@cards').last().scrollIntoView({ duration: 2000 });
    cy.wait(INTERCEPT.getPage.alias);
    cy.get('@cards').should('be.length', 32);
  });
});
