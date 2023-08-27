using BoDi;
using Helpers;
using OpenQA.Selenium;
using TechTalk.SpecFlow;

namespace Hooks;

[Binding]
public class BeforeTestRun
{
    private ScenarioContext _scenarioContext;
    private IWebDriver _webDriver;

    public BeforeTestRun(ScenarioContext scenarioContext, IWebDriver webDriver)
    {
        _scenarioContext = scenarioContext;
        _webDriver = webDriver;
    }

    [BeforeScenario]
    public void BeforeScenario()
    {
    }

    [AfterScenario]
    public void AfterScenario()
    {
        _webDriver.Close();
        _webDriver.Quit();
    }


    [BeforeTestRun]
    public async Task BeforeTest()
    {
        //reset the world
        await ApiHelper.ResetTheWorld();
    }
}