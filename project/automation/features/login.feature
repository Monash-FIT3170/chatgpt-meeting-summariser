@Web
Feature: Sample scenario
As a user, 
I want to login my own account 
So that using username/password to access all the summary points i created in the past meetings.


Scenario: Login to the Web portal successfully
    Given I am on the 'login page'
    And I have entered valid credentials
    When I press submit
    Then I am redirected to the 'upload page'