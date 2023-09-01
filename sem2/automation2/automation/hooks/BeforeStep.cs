using System.Configuration;
using TechTalk.SpecFlow;
using TechTalk.SpecFlow.Infrastructure;

namespace Hooks;

[Binding]
public class BeforeStep
{
    private readonly ISpecFlowOutputHelper _specFlowOutputHelper;

    public BeforeStep(ISpecFlowOutputHelper specFlowOutputHelper)
    {
        _specFlowOutputHelper = specFlowOutputHelper;
    }

    [BeforeStep()]
    public void BeforeStepStarts(IScenarioStepContext stepContext)
    {
        _specFlowOutputHelper.WriteLine("step started");
    }
}