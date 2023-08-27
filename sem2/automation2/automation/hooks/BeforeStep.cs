using TechTalk.SpecFlow;

namespace Hooks;

[Binding]
public class BeforeStep
{
    [BeforeStep()]
    public void BeforeStepStarts(IScenarioStepContext stepContext)
    {
        Console.WriteLine(stepContext.StepInfo.Text);
        Console.WriteLine("Before step");
    }
}