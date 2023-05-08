const {setWorldConstructor, World} = require('@cucumber/cucumber')
const {Capabilities, Builder } = require('selenium-webdriver')

let chrome = require('chromedriver')

class CustomWorld  extends World{
    constructor(options) {
        super(options)
        const capabilities = Capabilities.chrome();
        capabilities.set('chromeOptions', { "w3c": false });
        this.driver = new Builder().withCapabilities(capabilities).build();
    }

    // async quitWebdriver() {
    //     await this.driver.quit()
    // }
}

setWorldConstructor(CustomWorld);

module.exports = function() {
    this.World = CustomWorld;
    this.setDefaultTimeout(30 * 1000);
}