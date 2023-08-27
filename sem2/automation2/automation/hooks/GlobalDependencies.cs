using System.Configuration;
using System.Reflection;
using Autofac;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium;
using Pages;
using SpecFlow.Autofac;
using SpecFlow.Autofac.SpecFlowPlugin;
using TechTalk.SpecFlow;

namespace Hooks;

[Binding]
public class GlobalDependencies
{

    [ScenarioDependencies]
    public static void CreateGlobalContainer(ContainerBuilder containerBuilder)
    {
        Console.WriteLine("initializing dependencies");
        var chromeDriver = Directory.GetCurrentDirectory();
        var options = new ChromeOptions();
        options.AddArgument("start-maximized");

        containerBuilder.RegisterType<ChromeDriver>()
            .As<IWebDriver>()
            .InstancePerLifetimeScope()
            .SingleInstance()
            .WithParameter("chromeDriverDirectory", chromeDriver)
            .WithParameter("options", options);


        containerBuilder.AddSpecFlowBindings(typeof(BasePage));
        var assembly = Assembly.GetExecutingAssembly();

        containerBuilder.RegisterAssemblyTypes(assembly)
            .Where(t => t.Name.EndsWith("Steps"));


  
    }
}