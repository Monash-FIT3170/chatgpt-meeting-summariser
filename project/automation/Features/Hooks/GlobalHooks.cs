using BoDi;
using Helpers.Helpers;
using OpenQA.Selenium;
using System.Diagnostics;
using TechTalk.SpecFlow;
using TechTalk.SpecFlow.Infrastructure;

namespace Hooks;

[Binding]
public class GlobalHooks
{
    private readonly IWebDriver _webDriver;
    private readonly ISpecFlowOutputHelper _specFlowOutputHelper;
    private readonly ApiHelper _apiHelper;


    public GlobalHooks(IWebDriver webDriver, IObjectContainer objectContainer,
        ApiHelper apiHelper)
    {
        _webDriver = webDriver;
        _apiHelper = apiHelper;
        // work around due to autofac
        _specFlowOutputHelper = objectContainer.Resolve<ISpecFlowOutputHelper>();
    }


    [BeforeScenario]
    public async Task BeforeTest()
    {
        //reset the world
        await _apiHelper.ResetTheWorld();
    }

    [BeforeStep]
    public void BeforeStepStarts(ScenarioContext scenarioContext)
    {
        var stepContext = scenarioContext.StepContext;
        _specFlowOutputHelper.WriteLine($"<b>is this bold?</b>{stepContext.StepInfo.Text}" );
    }

    [AfterStep]
    public void TakeScreenShotAfterStep()
    {
        var screenShot = ((ITakesScreenshot)_webDriver).GetScreenshot();
        var fileName = RandomHealper.RandomString(10) + ".jpg" ;
        screenShot.SaveAsFile(fileName);
        _specFlowOutputHelper.AddAttachment(fileName);
    }


    [AfterScenario]
    public void AfterScenario()
    {
        _webDriver.Close();
        _webDriver.Quit();
    }

    [AfterTestRun]
    public static async Task AfterTestRun()
    {
        Process proc = new Process();
        proc.StartInfo.FileName = "livingdoc";
        proc.StartInfo.Arguments = "test-assembly Features.dll -t TestExecution.json ";
        proc.StartInfo.RedirectStandardError = true;
        proc.StartInfo.RedirectStandardOutput = true;
        proc.StartInfo.CreateNoWindow = true;
        proc.StartInfo.UseShellExecute = false;
        proc.Start();
        await proc.WaitForExitAsync();
        
        //open living doc
        var livingDoc = new Process();
        livingDoc.StartInfo.FileName = "LivingDoc.html";
        livingDoc.StartInfo.UseShellExecute = true;
        livingDoc.Start();
    }
}