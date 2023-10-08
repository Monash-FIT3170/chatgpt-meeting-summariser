using Helpers.Helpers;
using OpenQA.Selenium;
using WebDriver;

namespace Pages.Pages;

public class DashboardPage : BasePage
{

    private IWebElement UploadInput => WebDriver.FindElement(By.Id("upload-btn"));

    private IWebElement CreateNewMeetingButton => WebDriver.FindElement(By.Id("create_new_meeting"));

    private IWebElement MeetingSummary => WebDriver.FindElement(By.Id("summary_box"));

    public DashboardPage(IWebDriver webDriver) : base(webDriver)
    {
        _pageUrl = AppConfiguration.WebPortalAddress + "/home";
    }

    public override bool VerifyPage()
    {
        var headingBy = By.Id("create_meeting_heading");
        WebDriver.WaitUntilElementExists(headingBy);
        return WebDriver.FindElement(headingBy).Text.Equals("Welcome back");
    }
        
    public void ClickCreateNewMeeting()
    {
        CreateNewMeetingButton.Click();
    }

    public void UploadFile(string filename)
    {
        Thread.Sleep(TimeSpan.FromSeconds(2)); // TEMP WAIT NOT WORKING
        // WebDriver.WaitUntilElementExists(By.CssSelector("div[for='upload-btn']"));
        UploadInput.SendKeys(filename);
    }

    public void WaitForMeetingText(string text)
    {
        WebDriver.WaitUntilElementContainsText(MeetingSummary, text, 30);
    }
}