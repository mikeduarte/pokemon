const INTERCEPT = {
  getPage: {
    alias: '@getPage',
    intercept: (responseOverride: any) => cy.intercept('POST', '/', responseOverride).as('getPage'),
  },
  getPokemon: {
    alias: '@getPokemon',
    intercept: (responseOverride: any) =>
      cy.intercept('GET', /pokemon\/[0-9]{1}/, responseOverride).as('getPokemon'),
  },
};

export default INTERCEPT;
