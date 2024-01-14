/// <reference types="cypress" />

import INTERCEPT from '../support/interceptors';

describe('Pokemon Details Page', () => {
  beforeEach(() => {
    INTERCEPT.getPokemon.intercept((req) => {
      req.on('response', (res) => {
        res.setDelay(1000);
      });
    });
    cy.visit('/pokemon/bulbasaur/1');
    cy.waitForLoader();
  });

  it('loads', () => {
    cy.getByTestId('pokemon-detail').should('exist');
    cy.contains('bulbasaur');
    cy.contains('grass, poison');
  });

  it('shows stats and evolutions', () => {
    cy.contains('Stats');
    cy.contains('Showdown');
    cy.contains('Weight');
    cy.contains('Height');
    cy.contains('49');
    cy.contains('45');
    cy.get('[alt="bulbasaur showdown animation"]').should('exist');
  });

  it('contains favorite button', () => {
    cy.getByTestId('pokemon-detail').within(() => {
      cy.get('button[aria-label*="bulbasaur"]').should('exist');
    });
  });

  it('navigates to home page when home link is clicked', () => {
    cy.getByTestId('pokemon-detail').within(() => {
      cy.get('a[title*="View all Pokemon"]').click();
    });
    cy.url().should('match', /\/pokemon$/);
  });
});
