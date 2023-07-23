const chrome = require('chromedriver')
const { By } = require('selenium-webdriver');

module.exports = class BasePage {
    driver;

    constructor(driver) {
        this.driver = driver
    }

    goToUrl(url) {
        this.driver.get(url)
    }

    getTitle() {
        return this.driver.getTitle()
    }
}