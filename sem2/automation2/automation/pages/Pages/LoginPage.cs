using Helpers;
using OpenQA.Selenium;

namespace Pages.Pages;

public class LoginPage : BasePage
{
    public LoginPage(IWebDriver webDriver) : base(webDriver)
    {
        _pageUrl = AppSettings.BaseUrl;
    }

    public override bool VerifyPage()
    {
        return WebDriver.Title.Equals("Login");
    }
}