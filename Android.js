const wd = require("wd");

/**
 * Username to be used for running the test.
 */
const username = process.env.LT_USERNAME || "username";

/**
 * The access key to be used for running test test.
 */
const accessKey = process.env.LT_ACCESS_KEY || "accessKey";

/**
 * Capabilities to be passed while running the test.
 */
const desiredCapabilities = {
  app: "lt://proverbial-android", // Enter the 'app_url' here.
  build: "NodeJS - Android",
  name: "Sample Test NodeJS",
  deviceName: "Galaxy S20",
  isRealMobile: true,
  platformName: "android",
  platformVersion: "11",
  autoGrantPermissions: true,
  video: true,
  visual: true,
};

const driver = wd.promiseRemote(
  `https://${username}:${accessKey}@mobile-hub.lambdatest.com/wd/hub`
);

const DEFAULT_TIMEOUT = 10000;

/**
 * Run an android test.
 */
async function runAndroidTest() {
  try {
    driver
      .init(desiredCapabilities)
      .then(function () {
        return driver.waitForElementById("readMoreButton", DEFAULT_TIMEOUT);
      })
      .then(function (readMoreButton) {
        return readMoreButton.click();
      })
      .then(function () {
        return driver.waitForElementById("backButtonReadMorePage", DEFAULT_TIMEOUT);
      })
      .then(function (backButtonReadMorePage) {
        return backButtonReadMorePage.click();
      })
      .then(function () {
        return driver.waitForElementByAccessibilityID("Location", DEFAULT_TIMEOUT)
      })
      .then(function (Location) {
        return Location.click();
      })
      //navigate back needs to be added'
      .then(function () {
        return driver.waitforElementByXPath("//android.widget.FrameLayout[@content-desc=\"Browser\"]/android.widget.FrameLayout/android.widget.ImageView", DEFAULT_TIMEOUT)
      })
      .then(function (Browser) {
        return Browser.click();
      })
      // .then(function () {
      //   return driver.waitforElementByXPath("//android.widget.FrameLayout[@content-desc=\"Browser\"]/android.widget.FrameLayout/android.widget.ImageView", DEFAULT_TIMEOUT)
      // })
      // .then(function (Browser) {
      //   return Browser.click();
      // })
      .then(function (Browser) {
        Browser.click();
        return driver.waitForElementById("url", DEFAULT_TIMEOUT);
      })
      .then(function (url) {
        url.type("https://www.lambdatest.com");
        return driver.waitForElementById("find", DEFAULT_TIMEOUT);
      })
      .then(function (find) {
        find.click();
      })
      .then(function () {
        return driver.waitForElementByAccessibilityID("drawer open", DEFAULT_TIMEOUT)
      })
      .then(function (Drawer) {
        return Drawer.click();
      })
      .then(function () {
        return driver.waitforElementByXPath("//android.widget.CheckedTextView[contains(@text,\"Push Notification\")]", DEFAULT_TIMEOUT)
      })
      .then(function (Notification) {
        return Notification.click();
      })
      .then(function () {
        return driver.waitForElementByAccessibilityID("drawer Closed", DEFAULT_TIMEOUT)
      })
      .then(function (closeDrawer) {
        return closeDrawer.click();
        driver.quit();
      })
  } catch (e) {
    driver.quit();
  }
}

runAndroidTest();
