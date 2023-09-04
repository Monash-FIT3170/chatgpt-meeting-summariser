using OpenQA.Selenium;

namespace Pages
{
    public class BasePage
    {
        protected IWebDriver WebDriver;

        protected string _pageUrl = "https://google.com";

        public BasePage(IWebDriver webDriver)
        {
            this.WebDriver = webDriver;
        }

        public void GoToUrl()
        {
            WebDriver.Navigate().GoToUrl(_pageUrl);
        }

        public virtual bool VerifyPage()
        {
            return true;
        }
    }
}