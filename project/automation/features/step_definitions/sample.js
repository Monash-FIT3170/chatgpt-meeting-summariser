const { expect } = require('chai');
const { Given, When, Then, After, Before } = require('@cucumber/cucumber');

const GoogleSearchPage = require('../../pages/googleSearchPage');

require("chromedriver");

let googleSearchPage;

Before(async function () {
    googleSearchPage = new GoogleSearchPage(this.driver);
})


Given('I am on the Google search page', async function () {
    await googleSearchPage.goToUrl("http://www.google.com");
});

When('I search for {string}', async function (searchTerm) {
    await googleSearchPage.enterSearchKey(searchTerm);
    await googleSearchPage.submitSearch();
});

Then('the page title should start with {string}', { timeout: 60 * 1000 }, async function (searchTerm) {
    const title = await googleSearchPage.getTitle()
    const isTitleStartWithCheese = title.toLowerCase().lastIndexOf(`${searchTerm}`, 0) === 0;
    expect(isTitleStartWithCheese).to.equal(true);
});

