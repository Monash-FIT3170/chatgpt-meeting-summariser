using Helpers.Enums;
using TechTalk.SpecFlow;

namespace Features.Steps;

[Binding]
public class SharedSteps
{


    [Given(@"I am on the '([^']*)' page")]
    public void GivenIAmOnThePage(PageEnum page)
    {
        throw new PendingStepException();
    }

    [Then(@"I am redirected to the '([^']*)' page")]
    public void ThenIAmRedirectedToThePage(PageEnum page)
    {
        throw new PendingStepException();
    }
}