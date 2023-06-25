const INTERCEPT = {
  getPage: {
    alias: '@getPage',
    intercept: (responseOverride: any) =>
      cy.intercept('GET', /pokemon\/\?/, responseOverride).as('getPage'),
  },
  getPokemon: {
    alias: '@getPokemon',
    intercept: (responseOverride: any) =>
      cy.intercept('GET', /pokemon\/[0-9]{3}/, responseOverride).as('getPokemon'),
  },
  postUnfavorite: {
    alias: '@postUnfavorite',
    intercept: () => cy.intercept('POST', /unfavorite$/).as('postUnfavorite'),
  },
  postFavorite: {
    alias: '@postFavorite',
    intercept: () => cy.intercept('POST', /favorite$/).as('postFavorite'),
  },
  getAudio: {
    alias: '@getAudio',
    intercept: (responseOverride: any) =>
      cy.intercept('GET', /\.mp3$/, responseOverride).as('getAudio'),
  },
};

export default INTERCEPT;
