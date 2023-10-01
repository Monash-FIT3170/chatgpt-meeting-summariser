using FluentAssertions;
using Helpers.Enums;
using Pages.Pages;
using System.Configuration;
using BoDi;
using SharedData.DTOs;
using TechTalk.SpecFlow;
using TechTalk.SpecFlow.Infrastructure;

namespace Features.Steps;

[Binding]
public class SharedSteps
{
    private readonly LoginPage _loginPage;
    private readonly CreateAccountPage _createAccountPage;
    private readonly WebPortalUnderTest WebPortalUnderTest = WebPortalUnderTest.GetInstance();

    public SharedSteps(LoginPage loginPage, CreateAccountPage createAccountPage)
    {
        _loginPage = loginPage;
        _createAccountPage = createAccountPage;
    }

    [Given(@"I am on the '([^']*)' page")]
    public void GivenIAmOnThePage(PageEnum page)
    {
        switch (page)
        {
            case PageEnum.Login:
                _loginPage.GoToUrl();
                _loginPage.VerifyPage().Should().BeTrue();
                WebPortalUnderTest.currentPage = PageEnum.Login;
                break;
            case PageEnum.CreateAccount:
                GivenIAmOnThePage(PageEnum.Login);
                _loginPage.ClickCreateAccount();
                _createAccountPage.VerifyPage().Should().BeTrue();
                WebPortalUnderTest.currentPage = PageEnum.CreateAccount;
                break;
            default:
                throw new PendingStepException($"Page {page} is not implemented");

        }
    }


    [Then(@"I remain on the '([^']*)' page")]
    [Then(@"I am redirected to the '([^']*)' page")]    
    public void ThenIAmRedirectedToThePage(PageEnum page)
    {
        switch (page)
        {
            case PageEnum.Login:
                _loginPage.VerifyPage();
                break;
            case PageEnum.Dashboard:
                break;
            default:
                throw new PendingStepException($"Page {page} is not implemented");
        }
    }
}