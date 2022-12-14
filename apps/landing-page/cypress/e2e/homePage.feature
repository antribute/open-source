Feature: As a potential investor, I would like to be able to get more information about Antribute and what they do
  Scenario: Visiting the Home Page
    When I visit antribute.com
    Then I should see a logo and a blurb about the company
  Scenario: Clicking on the LinkedIn Link
    Given I am on the Antribute homepage
    When I click on the LinkedIn Link
    Then I should be navigated to the Antribute LinkedIn page in a new tab
  Scenario: Clicking on the Twitter Link
    Given I am on the Antribute homepage
    When I click on the Twitter Link
    Then I should be navigated to the Antribute Twitter profile in a new tab