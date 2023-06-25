/// <reference types="cypress" />

import INTERCEPT from '../support/interceptors';

describe('Pokemon Details Page', () => {
  beforeEach(() => {
    INTERCEPT.getPokemon.intercept((req) => {
      req.on('response', (res) => {
        res.setDelay(1000);
      });
    });
    cy.visit('/pokemon/Bulbasaur/001');
    cy.waitForLoader();
  });

  it('loads', () => {
    cy.getByTestId('pokemon-detail').should('exist');
    cy.contains('Bulbasaur');
    cy.contains('Grass, Poison');
  });

  it('plays audio on audio button click', () => {
    INTERCEPT.getAudio.intercept();
    cy.get('button[aria-label*="Listen"]').click();
    cy.wait(INTERCEPT.getAudio.alias).its('response.statusCode').should('eq', 206);
  });

  it('shows stats and evolutions', () => {
    INTERCEPT.getAudio.intercept();
    cy.contains('Stats');
    cy.contains('Evolutions');
    cy.contains('Weight');
    cy.contains('Height');
    cy.contains('6.04kg - 7.76kg');
    cy.contains('0.61m - 0.79m');
    cy.contains('951');
    cy.contains('1071');
    cy.getByTestId('pokemon-evolution-Ivysaur').should('exist');
    cy.getByTestId('pokemon-evolution-Venusaur').should('exist');
  });

  it('contains favorites buttons', () => {
    cy.getByTestId('pokemon-detail').within(() => {
      cy.get('button[aria-label*="Bulbasaur"]').should('exist');
      cy.get('button[aria-label*="Ivysaur"]').should('exist');
      cy.get('button[aria-label*="Venusaur"]').should('exist');
    });
  });
});
