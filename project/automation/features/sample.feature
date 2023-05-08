@Web
Feature: Sample scenario

Scenario: Finding some cheese
   Given I am on the Google search page
   When I search for "Cheese!"
   Then the page title should start with "cheese"

# Scenario: On visiting the homepage of selenium.dev
# Given I have visited the Selenium official web page on www.selenium.dev
# When There is a tile on the page as SeleniumHQ Browser Automation
# Then I should be able to click Search in the sidebar. 