using System.Reflection;
using Autofac;
using Pages;
using SpecFlow.Autofac;
using SpecFlow.Autofac.SpecFlowPlugin;

namespace Hooks;

public class GlobalDependencies
{
    [ScenarioDependencies]
    public static void CreateGlobalContainer(ContainerBuilder containerBuilder)
    {
        containerBuilder.AddSpecFlowBindings(typeof(BasePage));

        var assembly = Assembly.GetExecutingAssembly();

        containerBuilder.RegisterAssemblyTypes(assembly)
            .Where(t => t.Name.EndsWith("Steps"));
    }
}