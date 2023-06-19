const INTERCEPT = {
  getPage: {
    alias: '@getPage',
    intercept: () => cy.intercept('GET', /pokemon\/\?/).as('getPage'),
  },
  getPokemon: {
    alias: '@getPokemon',
    intercept: () => cy.intercept('GET', /pokemon\/[0-9]{3}/).as('getPokemon'),
  },
};

export default INTERCEPT;
