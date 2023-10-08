using System;
using System.Threading;
using System.Xml.Linq;
using OpenQA.Selenium;
using OpenQA.Selenium.Interactions;
using OpenQA.Selenium.Support.UI;

namespace WebDriver
{
    public static class WebDriverExtensions
    {

        private static readonly int _maxTimeout = 5;

        public static bool WaitUntilElementExists(this IWebDriver webDriver, IWebElement iWebElement)
        {
            var wait = new WebDriverWait(webDriver, TimeSpan.FromSeconds(_maxTimeout));
            wait.Until(condition =>
            {
                try
                {
                    return iWebElement.Displayed;
                }
                catch (StaleElementReferenceException)
                {
                    return false;
                }
                catch (NoSuchElementException)
                {
                    return false;
                }
            });
            return true;
        }

        public static bool WaitUntilElementExists(this IWebDriver webDriver, By selector)
        {
            var wait = new WebDriverWait(webDriver, TimeSpan.FromSeconds(_maxTimeout));
            wait.Until(condition =>
            {
                try
                {
                    return webDriver.FindElement(selector).Displayed;
                }
                catch (StaleElementReferenceException)
                {
                    return false;
                }
                catch (NoSuchElementException)
                {
                    return false;
                }
            });
            return true;
        }

        public static bool WaitUntilElementIsClickable(this IWebDriver webDriver, IWebElement element)
        {
            var wait = new WebDriverWait(webDriver, TimeSpan.FromSeconds(_maxTimeout));
            wait.Until(condition =>
            {
                try
                {
                    return element.Displayed && element.Enabled;
                }
                catch (StaleElementReferenceException)
                {
                    return false;
                }
                catch (NoSuchElementException)
                {
                    return false;
                }
                catch (ElementClickInterceptedException)
                {
                    return false;
                }
            });
            return true;
        }
        public static bool WaitUntilElementIsClickable(this IWebDriver webDriver, By selector)
        {
            return WaitUntilElementIsClickable(webDriver, webDriver.FindElement(selector));
        }

        public static void ScrollTillElementIsInView(this IWebDriver webDriver, IWebElement element)
        {
            var actions = new Actions(webDriver);
            actions.MoveToElement(element);
            ((IJavaScriptExecutor)webDriver).ExecuteScript("arguments[0].scrollIntoView(true);", element);
            Thread.Sleep(500);
        }

        public static bool WaitUntilElementIsNotVisible(this IWebDriver webDriver, IWebElement webElement)
        {
            var wait = new WebDriverWait(webDriver, TimeSpan.FromSeconds(_maxTimeout));
            wait.Until(condition =>
            {
                try
                {
                    return !webElement.Displayed;
                }
                catch (StaleElementReferenceException)
                {
                    return false;
                }
                catch (NoSuchElementException)
                {
                    return false;
                }
            });
            return true;
        }

        public static bool WaitUntilElementContainsText(this IWebDriver webDriver, IWebElement webElement, string text)
        {
            return WaitUntilElementContainsText(webDriver, webElement, text, _maxTimeout);
        }


        public static bool WaitUntilElementContainsText(this IWebDriver webDriver, IWebElement webElement, string text, int timeoutSeconds)
        {
            var wait = new WebDriverWait(webDriver, TimeSpan.FromSeconds(timeoutSeconds));
            wait.Until(condition =>
            {
                try
                {
                    return webElement.Text.Contains(text);
                }
                catch (StaleElementReferenceException)
                {
                    return false;
                }
                catch (NoSuchElementException)
                {
                    return false;
                }
            });
            return true;
        }

    }
}