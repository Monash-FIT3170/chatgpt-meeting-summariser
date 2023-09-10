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
        throw new PendingStepException();
    }

    [When(@"I submit")]
    public void WhenISubmit()
    {
        throw new PendingStepException();
    }


    [Given(@"I have filled invalid <detail>")]
    public void GivenIHaveFilledInvalidDetail()
    {
        throw new PendingStepException();
    }

    [When(@"try and submit")]
    public void WhenTryAndSubmit()
    {
        throw new PendingStepException();
    }


    [Then(@"I see an error message with invalid")]
    public void ThenISeeAnErrorMessageWithInvalid(Table table)
    {
        throw new PendingStepException();
    }

}