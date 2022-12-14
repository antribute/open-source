import { When, Then, Given } from '@badeball/cypress-cucumber-preprocessor';

When('I visit antribute.com', () => {
  cy.visit('https://staging.antribute.com');
});

Then('I should see a logo and a blurb about the company', () => {
  cy.get('h1').should('contain', 'Hello, World!');
});

Given('I am on the Antribute homepage', () => {
  cy.visit('https://staging.antribute.com');
});

When('I click on the LinkedIn Link', () => {
  cy.contains('LinkedIn');
});

Then('I should be navigated to the Antribute LinkedIn page in a new tab', () => {
  cy.contains('LinkedIn')
    .should('have.attr', 'href', 'https://linkedin.com/company/antribute')
    .should('have.attr', 'target', '_blank')
    .should('have.attr', 'rel', 'noopener noreferrer');
});

When('I click on the Twitter Link', () => {
  cy.contains('Twitter');
});

Then('I should be navigated to the Antribute Twitter profile in a new tab', () => {
  cy.contains('Twitter')
    .should('have.attr', 'href', 'https://twitter.com/antribute')
    .should('have.attr', 'target', '_blank')
    .should('have.attr', 'rel', 'noopener noreferrer');
});
