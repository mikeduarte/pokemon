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
    cy.getByTestId('type-select').find('input').selectOption('Electric');
    cy.waitForLoader();
    cy.wait(INTERCEPT.getPage.alias);
    cy.getByTestId('pokemon-vertical-card').should('be.length', 9);
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
    cy.get('button[aria-label*="Bulbasaur"]')
      .as('favBulbasaur')
      .then(($btn) => {
        if ($btn.attr('aria-label').includes('Remove')) {
          INTERCEPT.postUnfavorite.intercept();
          cy.get('@favBulbasaur').click();
          cy.wait(INTERCEPT.postUnfavorite.alias);
        }
      });

    //need to make sure not already a favorite
    cy.get('button[aria-label*="Ivysaur"]')
      .as('favIvysaur')
      .then(($btn) => {
        if ($btn.attr('aria-label').includes('Remove')) {
          INTERCEPT.postUnfavorite.intercept();
          cy.get('@favIvysaur').click();
          cy.wait(INTERCEPT.postUnfavorite.alias);
        }
      });

    INTERCEPT.postFavorite.intercept();
    cy.get('@favBulbasaur').click();
    cy.get('@favIvysaur').click();
    cy.wait([INTERCEPT.postFavorite.alias, INTERCEPT.postFavorite.alias]);

    cy.get('button').contains('Favorites').click();
    cy.waitForLoader();

    cy.contains('Bulbasaur').should('exist');
    cy.contains('Ivysaur').should('exist');
  });

  it('removes pokemon from favorites', () => {
    cy.get('button').contains('Favorites').click();
    cy.waitForLoader();

    INTERCEPT.postUnfavorite.intercept();
    cy.get('button[aria-label*="Ivysaur"]').as('favIvysaur').click();
    cy.wait([INTERCEPT.postUnfavorite.alias]);
    cy.contains('Ivysaur').should('not.exist');
  });

  it('navigations to pokemon details page on pokemon card click', () => {
    INTERCEPT.getPokemon.intercept((req) => {
      req.on('response', (res) => {
        res.setDelay(1000);
      });
    });
    cy.contains('Bulbasaur').click();
    cy.waitForLoader();

    cy.url().should('include', 'Bulbasaur');
    cy.contains('Bulbasaur');
  });

  it('navigations back to home page on browser back button', () => {
    INTERCEPT.getPokemon.intercept();
    cy.contains('Bulbasaur').click();
    cy.wait(INTERCEPT.getPokemon.alias);
    cy.go('back');
    cy.url().should('match', /\/pokemon$/);
  });
});
