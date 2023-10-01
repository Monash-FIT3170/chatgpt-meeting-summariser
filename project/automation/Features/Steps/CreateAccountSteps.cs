using Helpers.Helpers;
using Pages.Pages;
using SharedData.DTOs;
using TechTalk.SpecFlow;

namespace Features.Steps;

[Binding]
public class CreateAccountSteps
{
    private readonly CreateAccountPage _createAccountPage;
    private readonly WebPortalUnderTest WebPortalUnderTest = WebPortalUnderTest.GetInstance();
    private readonly LoginPage _loginPage;


    public CreateAccountSteps(CreateAccountPage createAccountPage, LoginPage loginPage)
    {
        _createAccountPage = createAccountPage;
        _loginPage = loginPage;
    }

    [Given(@"I filled in valid account details")]
    public void GivenIFilledInValidAccountDetails()
    {
        _createAccountPage.EnterEmail("testcreate@test.com");
        WebPortalUnderTest.UserUnderTest.UserName = RandomHelper.RandomAsciiString(10);
        _createAccountPage.EnterUsername(WebPortalUnderTest.UserUnderTest.UserName);
        WebPortalUnderTest.UserUnderTest.Password = "Password#23";
        _createAccountPage.EnterPassword(WebPortalUnderTest.UserUnderTest.Password);
    }

    [When(@"I create my account")]
    public void WhenICreateMyAccount()
    {
        _createAccountPage.CreateAccount();
    }

    [Then(@"I can login with my account")]
    public void ThenICanLoginWithMyAccount()
    {
        _loginPage.EnterUsername(WebPortalUnderTest.UserUnderTest.UserName);
        _loginPage.EnterPassword(WebPortalUnderTest.UserUnderTest.Password);
        _loginPage.ClickCreateAccount();
    }


}