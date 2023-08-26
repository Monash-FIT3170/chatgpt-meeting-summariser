using Helpers;
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
    public async void BeforeTest()
    {
        //reset the world
        await ApiHelper.ResetTheWorld();
    }
}