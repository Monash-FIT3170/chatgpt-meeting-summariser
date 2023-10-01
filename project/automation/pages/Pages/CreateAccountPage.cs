using OpenQA.Selenium;
using WebDriver;

namespace Pages.Pages;

public class CreateAccountPage : BasePage
{
    private IWebElement UserNameInput => WebDriver.FindElement(By.Id("username"));
    private IWebElement EmailInput => WebDriver.FindElement(By.Id("email"));
    private IWebElement PasswordElement => WebDriver.FindElement(By.Id("password"));
    private IWebElement CreateAccountButton => WebDriver.FindElement(By.Id("create_account"));

    public CreateAccountPage(IWebDriver webDriver) : base(webDriver)
    {
    }

    public override bool VerifyPage()
    {
        var pageHeading = By.CssSelector("#heading");
        WebDriver.WaitUntilElementExists(pageHeading);
        return WebDriver.FindElement(pageHeading).Text.Equals("Create Account");
    }

    public void EnterUsername(string username)
    {
        UserNameInput.Clear();
        UserNameInput.SendKeys(username);
    }

    public void EnterEmail(string email)
    {
        EmailInput.Clear();
        EmailInput.SendKeys(email);
    }

    public void EnterPassword(string password)
    {
        PasswordElement.Clear();
        PasswordElement.SendKeys(password);
    }

    public void CreateAccount()
    {
        CreateAccountButton.Click();
    }
}