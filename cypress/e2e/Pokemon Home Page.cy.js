/// <reference types="cypress" />

import INTERCEPT from '../support/interceptors';

describe('Pokemon Home Page', () => {
  beforeEach(() => {
    INTERCEPT.getPage.intercept((req) => {
      req.on('response', (res) => {
        res.setDelay(1000);
      });
    });
    cy.visit('/pokemon');
    cy.waitForLoader();
  });

  it('displays 16 pokemon on load', () => {
    cy.getByTestId('pokemon-vertical-card').should('be.length', 16);
  });

  it('displays more pokemon on scroll', () => {
    cy.getByTestId('pokemon-vertical-card').as('cards');
    cy.get('@cards').last().scrollIntoView({ duration: 2000 });
    cy.wait(INTERCEPT.getPage.alias);
    cy.get('@cards').should('be.length', 32);
  });

  it('filters pokemon by type', () => {
    cy.getByTestId('type-select').find('input').selectOption('electric');
    cy.waitForLoader();
    cy.wait(INTERCEPT.getPage.alias);
    cy.getByTestId('pokemon-vertical-card').should('be.length', 15);
  });

  it('switches to list view', () => {
    cy.getByTestId('layout-view-buttons').find('[aria-label="List View"]').click();
    cy.waitForLoader();
    cy.wait(INTERCEPT.getPage.alias);
    cy.getByTestId('pokemon-horizontal-card').should('be.length', 16);
  });

  it('filters by search term', () => {
    cy.getByTestId('search-text-field-Search').find('input').type('bul');
    cy.waitForLoader();
    cy.wait(INTERCEPT.getPage.alias);
    cy.getByTestId('pokemon-vertical-card').should('be.length', 1);
  });

  it('shows no results message when no results', () => {
    cy.getByTestId('search-text-field-Search').find('input').type('aaaaaa');
    cy.waitForLoader();
    cy.wait(INTERCEPT.getPage.alias);
    cy.getByTestId('no-results').should('exist');
  });

  it('adds pokemon to favorites', () => {
    //need to make sure not already a favorite
    cy.get('button[aria-label*="bulbasaur"]')
      .as('favBulbasaur')
      .then(($btn) => {
        if ($btn.attr('aria-label').includes('Remove')) {
          cy.get('@favBulbasaur').click();
        }
      });

    //need to make sure not already a favorite
    cy.get('button[aria-label*="ivysaur"]')
      .as('favIvysaur')
      .then(($btn) => {
        if ($btn.attr('aria-label').includes('Remove')) {
          cy.get('@favIvysaur').click();
        }
      });

    cy.get('@favBulbasaur').click();
    cy.get('@favIvysaur').click();

    cy.get('button').contains('Favorites').click();
    cy.waitForLoader();

    cy.contains('bulbasaur').should('exist');
    cy.contains('ivysaur').should('exist');
  });

  it('removes pokemon from favorites', () => {
    cy.get('button[aria-label*="ivysaur"]').as('favIvysaur').click();
    cy.get('button').contains('Favorites').click();
    cy.waitForLoader();

    cy.get('button[aria-label*="ivysaur"]').as('favIvysaur').click();
    cy.contains('ivysaur').should('not.exist');
  });

  it('navigates to pokemon details page on pokemon card click', () => {
    INTERCEPT.getPokemon.intercept((req) => {
      req.on('response', (res) => {
        res.setDelay(1000);
      });
    });
    cy.contains('bulbasaur').click();
    cy.waitForLoader();

    cy.url().should('include', 'bulbasaur');
    cy.contains('bulbasaur');
  });

  it('navigates back to home page on browser back button', () => {
    INTERCEPT.getPokemon.intercept();
    cy.contains('bulbasaur').click();
    cy.wait(INTERCEPT.getPokemon.alias);
    cy.go('back');
    cy.url().should('match', /\/pokemon$/);
  });
});
