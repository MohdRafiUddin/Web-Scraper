/// <reference types="cypress" />

// Welcome to Media Scraper Home Page!
//
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe("example to-do app", () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit("http://localhost:3000");
  });

  it("should display title, heading and login by default", () => {
    cy.get("[id=landing-heading]").should('contain', 'A Web Scraper allows you to retrieve public web data easily');
    cy.get("[id=login-google]").should('contain', 'Login With Google');
  });
});
