Feature: User login

As a user
I want to login
So that I can view the dashboard

@Critical
Scenario: Login successful with valid credentials suceeds
	Given I am on the 'login' page
	And I have filled in valid login details
	When I submit
	Then I am redirected to the 'dashboard' page


@Critical
Scenario Outline: Attempt to login with invalid details fails
	Given I am on the 'login' page
	And I have filled an invalid <detail>
	When I try and submit
	Then I remain on the 'login' page
	And I see an error message saying invalid login

	Examples: 
	| detail   |
	| username |
	| password |

@Critical
Scenario Outline: Attempt to login with missing details fails
	Given I am on the 'login' page
	And I have not filled in <detail>
	When I try and submit
	Then I remain on the 'login' page
	And I see an error message saying invalid login 

	Examples: 
	| detail   |
	| username |
	| password |

@Pending
Scenario Outline: Login with a different platform suceeds
	Given I am on the 'login' page
	And I select to login with <platform>
	When I choose my <platform> account
	Then I am redirected to the 'dashboard' page

	Examples: 
	| platform |
	| google   |
	| facebook |
	| github   |

	
