using TechTalk.SpecFlow;

namespace Hooks;

[Binding]
public class BeforeTestRun
{
    private ScenarioContext _scenarioContext;

    public BeforeTestRun(ScenarioContext scenarioContext)
    {
        _scenarioContext = scenarioContext;
    }

    [BeforeTestRun]
    public void BeforeTest()
    {
        //reset the world

    }
}