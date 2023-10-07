using Helpers.Helpers;
using OpenQA.Selenium;
using WebDriver;

namespace Pages.Pages;

public class DashboardPage : BasePage
{
    public DashboardPage(IWebDriver webDriver) : base(webDriver)
    {
        _pageUrl = AppConfiguration.WebPortalAddress + "/home";
    }

    public override bool VerifyPage()
    {
        base.VerifyPage();
        var headingBy = By.Id("create_meeting_heading");
        WebDriver.WaitUntilElementExists(headingBy);
        return WebDriver.FindElement(headingBy).Text.Equals("Welcome back");
    }
}