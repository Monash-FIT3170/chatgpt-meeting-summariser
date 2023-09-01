using BoDi;
using Helpers.Helpers;
using OpenQA.Selenium;
using TechTalk.SpecFlow;

namespace Hooks;

[Binding]
public class BeforeTestRun
{
    private IScenarioContext _scenarioContext;
    private readonly IWebDriver _webDriver;

    public BeforeTestRun(ScenarioContext scenarioContext, IWebDriver webDriver)
    {
        _scenarioContext = scenarioContext;
        _webDriver = webDriver;
    }

    [AfterScenario]
    public void AfterScenario()
    {
        _webDriver.Close();
        _webDriver.Quit();
    }


    [BeforeTestRun]
    public static async Task BeforeTest()
    {
        //reset the world
        await ApiHelper.ResetTheWorld();
    }
}