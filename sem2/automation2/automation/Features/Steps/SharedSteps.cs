using FluentAssertions;
using Helpers.Enums;
using Pages.Pages;
using System.Configuration;
using BoDi;
using TechTalk.SpecFlow;
using TechTalk.SpecFlow.Infrastructure;

namespace Features.Steps;

[Binding]
public class SharedSteps
{
    private LoginPage _loginPage;
    private readonly ISpecFlowOutputHelper _specFlowOutputHelper;

    public SharedSteps(IObjectContainer objectContainer, LoginPage loginPage)
    {
        _loginPage = loginPage;
        _specFlowOutputHelper = objectContainer.Resolve<ISpecFlowOutputHelper>();
    }

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