Feature: Create account
As a user
I want to be able to create an account
So then I can log in


@Critical
Scenario: Create an account with valid credentials suceeds
	Given I am on the 'create account' page
	And I filled in valid account details
	When I create my account
	Then I am redirected to the 'login' page
	And I can login with my account


Scenario: Create an account fails with weak password
	Given I am on the 'create account' page
	And I have have filled in a weak password
	When I try and creat my account
	Then I see an error telling me I have an invalid 'password'
	And I cannot log into my new account
	

Scenario: Create an accoutn fails with an invalid email
	Given I am on the 'create account' page
	And I have have filled in a weak password
	When I try and creat my account
	Then I see an error telling me I have an invalid 'password'
	And I cannot log into my new account
	