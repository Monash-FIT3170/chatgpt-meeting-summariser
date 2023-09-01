using Helpers;
using OpenQA.Selenium;

namespace Pages.Pages;

public class LoginPage : BasePage
{
    public LoginPage(IWebDriver webDriver) : base(webDriver)
    {
        _pageUrl = "http://localhost:3000";
    }

    public override bool VerifyPage()
    {
        return WebDriver.Title.Equals("Login");
    }
}