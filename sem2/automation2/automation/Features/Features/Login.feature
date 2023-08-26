Feature: As a user I want to login sucessfully

A short summary of the feature

@critical
Scenario: Login successful with valid credentials 
	Given I am on the 'login' page
	And I have filled in valid login details
	When I submit
	Then I am redirected to the 'dashboard' page


@critical
Scenario Outline: Attempt to login with invalid details fails
	Given I am on the 'login' page
	And I have filled invalid <detail>
	When try and submit
	Then I remain on the 'login' page
	And I see an error message with invalid

	| detail   |
	| username |
	| password |

