const { After } = require('@cucumber/cucumber');


require("chromedriver");

After({tags: "@Web"},async function () {
    await this.driver.quit()
})

