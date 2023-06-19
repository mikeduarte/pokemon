/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    getByTestId(dataTestAttribute: string, args?: any): Chainable<JQuery<HTMLElement>>;
  }
}
