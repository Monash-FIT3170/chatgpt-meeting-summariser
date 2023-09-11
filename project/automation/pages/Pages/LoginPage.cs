using Helpers;
using Helpers.Helpers;
using OpenQA.Selenium;
using WebDriver;

namespace Pages.Pages;

public class LoginPage : BasePage
{

    private IWebElement UserNameInput => WebDriver.FindElement(By.Id("username_input"));
    private IWebElement PasswordInput => WebDriver.FindElement(By.Id("password_input"));
    private IWebElement LoginButton => WebDriver.FindElement(By.Id("login"));
    private IWebElement LoginError => WebDriver.FindElement(By.Id("login_error"));

    public LoginPage(IWebDriver webDriver) : base(webDriver)
    {
        _pageUrl = AppConfiguration.WebPortalAddress;
    }

    public override bool VerifyPage()
    {
        var loginBy = By.CssSelector("#login_box > h2");
        WebDriver.WaitUntilElementExists(loginBy);
        return WebDriver.FindElement(loginBy).Text.Equals("Login");
    }

    public string GetErrorMessage()
    {
        WebDriver.WaitUntilElementExists(LoginError);
        return LoginError.Text;
    }

    public void EnterUsername(string username)
    {
        UserNameInput.Clear();
        UserNameInput.SendKeys(username);
    }

    public void EnterPassword(string password)
    {
        PasswordInput.Clear();
        PasswordInput.SendKeys(password);
    }

    public void Login()
    {
        LoginButton.Click();
    }
}