const { Builder, By, until } = require("selenium-webdriver");
require("selenium-webdriver/testing");
const assert = require("assert"); // this is node.js in-built assert
require("chromedriver");

describe("Google homepage", function() {
  let driver;
  const host = "https://www.google.com";
  this.timeout(1000 * 60 * 2);
  before(() => {
    driver = new Builder().forBrowser("chrome").build(); // safari, firefox
  });
  beforeEach(() => {
    console.log("test begin");
  });
  it("should display search box", async () => {
    await driver.get(host);
    // waiting for an element
    const div = await driver.findElement(By.css("div"));
    await driver.wait(until.elementIsVisible(div), 1500); // at most wait for 1500 ms
    await driver.findElement(By.css("input")).then(input => {
      assert.notEqual(input, null);
    });
    await driver.getTitle().then(title => {
      assert.equal(title, "Google");
      assert.equal(title.length > 0, true);
    });
  });
  afterEach(() => console.log("test end"));
  after(() => {
    driver.quit();
  });
});
/**
 * Potential issue :
 * 1 Session not created
 *  try solution:
 *      1 check you machine `localhost` reference, like MAC OS: `sudo vi /etc/hosts`, `127.0.0.1 localhost`
 * 2 chromedriver version and chrome version match:
 *  try solution:
 *      1 check `http://chromedriver.chromium.org/downloads`
 */
