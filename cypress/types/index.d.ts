/// <reference types="cypress" />

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  interface Chainable {
    getByTestId(dataTestAttribute: string, args?: any): Chainable<JQuery<HTMLElement>>;
    selectOption(prevSubject: any, subject: any, value: any): Chainable<void>;
    waitForLoader(): Chainable<void>;
  }
}
