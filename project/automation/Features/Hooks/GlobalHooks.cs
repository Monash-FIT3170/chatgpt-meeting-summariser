using BoDi;
using Helpers.Helpers;
using Microsoft.Extensions.Configuration;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System.Diagnostics;
using Gherkin.Ast;
using TechTalk.SpecFlow;
using TechTalk.SpecFlow.EnvironmentAccess;
using TechTalk.SpecFlow.Infrastructure;

namespace Hooks;


//TODO: split up into hook scopes (step, feature, scenario)


[Binding]
public class GlobalHooks
{
    private IWebDriver webDriver;
    private readonly ISpecFlowOutputHelper _specFlowOutputHelper;
    private readonly IObjectContainer _objectContainer;


    public GlobalHooks(IObjectContainer objectContainer)
    {
        _objectContainer = objectContainer;
        // work around due to autofac
        _specFlowOutputHelper = objectContainer.Resolve<ISpecFlowOutputHelper>();
    }


    [BeforeScenario]
    public async Task BeforeTest()
    {
        // IoC
        var chromeDriver = Directory.GetCurrentDirectory();
        var options = new ChromeOptions();
        options.AddArgument("start-maximized");

        //TODO: replace with a webdriver factory
        webDriver = new ChromeDriver(options);
        _objectContainer.RegisterInstanceAs<IWebDriver>(webDriver);

        var configuration = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json")
            .Build();

        AppConfiguration.Initialize(configuration);

        //reset the world
        var apiHelper = _objectContainer.Resolve<ApiHelper>();
        await apiHelper.ResetTheWorld();
    }

    [BeforeScenario(tags:"Pending")]
    public void SkipPendingTests()
    {
       ScenarioContext.StepIsPending();
    }

    [BeforeStep]
    public void BeforeStepStarts(ScenarioContext scenarioContext)
    {
        var stepContext = scenarioContext.StepContext;
        _specFlowOutputHelper.WriteLine($"{stepContext.StepInfo.Text}" );
    }

    [AfterStep]
    public void TakeScreenShotAfterStep()
    {
        var screenShot = ((ITakesScreenshot)webDriver).GetScreenshot();
        var fileName = RandomHelper.RandomAlphanumericString(10) + ".jpg" ;
        screenShot.SaveAsFile(fileName);
        _specFlowOutputHelper.AddAttachment(fileName);
    }


    [AfterScenario]
    public void AfterScenario()
    {
        webDriver.Close();
        webDriver.Quit();
    }


    // disable as not needed for local
    //[AfterTestRun]
    public static void AfterTestRun()
    {
        Process proc = new Process();
        proc.StartInfo.FileName = "livingdoc";
        proc.StartInfo.Arguments = "test-assembly Features.dll -t TestExecution.json ";
        proc.StartInfo.RedirectStandardError = true;
        proc.StartInfo.RedirectStandardOutput = true;
        proc.StartInfo.CreateNoWindow = true;
        proc.StartInfo.UseShellExecute = false;
        proc.Start();
        proc.WaitForExit();

        Thread.Sleep(2); 
        // ensure data is there, add proper wait later
        // Proper wait
        // 1. delete file previosly
        // 2. wait for file to appear
        // 3. run second process

        //open living doc
        var livingDoc = new Process();
        livingDoc.StartInfo.FileName = "LivingDoc.html";
        livingDoc.StartInfo.UseShellExecute = true;
        livingDoc.Start();
    }
}