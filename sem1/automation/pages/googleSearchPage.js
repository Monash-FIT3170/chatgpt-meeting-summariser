const BasePage = require("./base_page");
const chrome = require('chromedriver')
const { By } = require('selenium-webdriver');


module.exports =  class GoogleSearchPage extends BasePage {

    constructor(driver) {
        super(driver)
    }

    async #getSearchElement() {
        return await this.driver.findElement(By.name("q"))
    }

    async enterSearchKey(searchTerm) {
        let element = await this.#getSearchElement();
        await element.click();
        await element.clear();
        await element.sendKeys(searchTerm);
    }

    async submitSearch() {
        let element = await this.#getSearchElement();
        await element.submit();
    }
}