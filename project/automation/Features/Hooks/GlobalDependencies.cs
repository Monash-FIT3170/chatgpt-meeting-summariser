using System.Configuration;
using System.Reflection;
using Autofac;
using Helpers.Helpers;
using Microsoft.Extensions.Configuration;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium;
using Pages;
using SpecFlow.Autofac;
using SpecFlow.Autofac.SpecFlowPlugin;
using TechTalk.SpecFlow;
using TechTalk.SpecFlow.Infrastructure;
using ContainerBuilder = Autofac.ContainerBuilder;

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


        containerBuilder.RegisterAssemblyTypes(typeof(BasePage).Assembly)
            .Where(t => t.IsSubclassOf(typeof(BasePage)))
            .SingleInstance()
            .AsSelf();

        var configuration = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json")
            .Build();
        containerBuilder.RegisterInstance<IConfiguration>(configuration);

        containerBuilder.RegisterInstance<ApiHelper>(new ApiHelper(configuration));

        containerBuilder.AddSpecFlowBindings(typeof(GlobalHooks));

        var assembly = Assembly.GetExecutingAssembly();

        containerBuilder.RegisterAssemblyTypes(assembly)
            .Where(t => t.Name.EndsWith("Steps"));
    }
}