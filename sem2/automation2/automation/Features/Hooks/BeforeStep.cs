using BoDi;
using System.Configuration;
using TechTalk.SpecFlow;
using TechTalk.SpecFlow.Infrastructure;

namespace Hooks;

[Binding]
public class BeforeStep
{
    private readonly ISpecFlowOutputHelper _specFlowOutputHelper;

    public BeforeStep(IObjectContainer container)
    {
        //bridge with autofac
        _specFlowOutputHelper = container.Resolve<ISpecFlowOutputHelper>();
    }

    [BeforeStep]
    public void BeforeStepStarts(ScenarioContext scenarioContext)
    {
        var stepContext = scenarioContext.StepContext;
        _specFlowOutputHelper.WriteLine("step started");
    }
}