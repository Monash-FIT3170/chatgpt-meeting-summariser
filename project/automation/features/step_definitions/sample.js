const { expect } = require('chai');
const { Given, When, Then, After } = require('@cucumber/cucumber');

const { Builder, By, Capabilities, Key } = require('selenium-webdriver');

require("chromedriver");



Given('I am on the Google search page', async function () {
    await this.driver.get('http://www.google.com');
});

When('I search for {string}', async function (searchTerm) {
    const element = await this.driver.findElement(By.name('q'));
    await element.click()
    await element.clear()
    await element.sendKeys(searchTerm);
    await element.submit();
});

Then('the page title should start with {string}', { timeout: 60 * 1000 }, async function (searchTerm) {
    const title = await this.driver.getTitle();
    const isTitleStartWithCheese = title.toLowerCase().lastIndexOf(`${searchTerm}`, 0) === 0;
    expect(isTitleStartWithCheese).to.equal(true);
});
