using FluentAssertions;
using Helpers.Enums;
using Pages.Pages;
using TechTalk.SpecFlow;

namespace Features.Steps;

[Binding]
public class SharedSteps
{
    private LoginPage _loginPage;


    [Given(@"I am on the '([^']*)' page")]
    public void GivenIAmOnThePage(PageEnum page)
    {
        switch (page)
        {
            case PageEnum.Login:
                _loginPage.GoToUrl();
                _loginPage.VerifyPage().Should().BeTrue();
                break;
        }
    }

    [Then(@"I am redirected to the '([^']*)' page")]
    public void ThenIAmRedirectedToThePage(PageEnum page)
    {
        throw new PendingStepException();
    }
}