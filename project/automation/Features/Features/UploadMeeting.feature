Feature: Upload Meetings

As a user, I want to be able to upload meetings so that I can get them automatically sumarized


@Critical
Scenario Outline: Meeting can be uploaded sucessfuly in a valid fileformat
	Given I am on the 'dashboard' page
	And I have a meeting in '<format>'
	When I upload my meeting 
	Then I can see a valid meeting summary


	Examples: 
	| format |
	| mp4    |