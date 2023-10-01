using FluentAssertions;
using Helpers.Helpers;
using Pages.Pages;
using TechTalk.SpecFlow;

namespace Features.Steps;

[Binding]
public class LoginSteps
{

    private LoginPage _loginPage;

    public LoginSteps(LoginPage loginPage)
    {
        _loginPage = loginPage;
    }

    [Given(@"I have filled in valid login details")]
    public void GivenIHaveFilledInValidLoginDetails()
    {
        _loginPage.EnterUsername(AppConfiguration.DefaultUserName);
        _loginPage.EnterPassword(AppConfiguration.DefaultPassword);
    }

    [Given(@"I have not filled in (username|password)")]
    public void GivenIHaveNotFilledInUsername(string detail)
    {
        switch (detail)
        {
            case "username":
                _loginPage.EnterPassword(RandomHelper.RandomAsciiString(10));
                break;
            case "password":
                _loginPage.EnterUsername(RandomHelper.RandomAsciiString(10));
                break;
        }
    }


    [When(@"I submit")]
    [When(@"I try and submit")]
    public void WhenISubmit()
    {
        _loginPage.Login();
    }


    [Given(@"I have filled an invalid (username|password)")]
    public void GivenIHaveFilledInvalid(string detail)
    {
        GivenIHaveFilledInValidLoginDetails();

        switch (detail)
        {
            case "username":
                _loginPage.EnterUsername(RandomHelper.RandomAsciiString(10));
                break;
            case "password":
                _loginPage.EnterPassword(RandomHelper.RandomAsciiString(10));
                break;
        }
    }

    [Then(@"I see an error message saying invalid login")]
    public void ThenISeeAnErrorMessageWithInvalid()
    {
        _loginPage.GetErrorMessage().Should().Be("Invalid username or password");
    }
            
}