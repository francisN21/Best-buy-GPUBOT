// import puppeteer from "puppeteer";
const puppeteer = require("puppeteer");

// const init = document.querySelector(".start");

const test_url =
  "https://www.bestbuy.com/site/endust-screen-cleaning-wipes-70-pack-blue/5611313.p?skuId=5611313";

const startBrowser = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(test_url);
  return page;
};

const addToCart = async (page) => {
  await page.waitFor(3000);
  await page.$eval(
    "[class='btn btn-primary btn-lg btn-block btn-leading-ficon add-to-cart-button']",
    (element) => element.click()
  );
  await page.waitFor(3000);
  await page.$eval("[class='btn btn-secondary btn-sm btn-block ']", (element) =>
    element.click()
  );
  await page.waitFor(3000);
  await page.$eval("[class='btn btn-lg btn-block btn-primary']", (element) =>
    element.click()
  );
  await page.waitFor(3000);
  await page.$eval(
    "[class='btn btn-secondary btn-lg cia-guest-content__continue guest']",
    (element) => element.click()
  );
  await page.waitFor(3000);
};

const fillInfo = async (page) => {
  await page.waitFor(3000);
  await page.type(
    "[id='consolidatedAddresses.ui_address_2.firstName']",
    "Francisco"
  );
  await page.type(
    "[id='consolidatedAddresses.ui_address_2.lastName']",
    "Rones"
  );
  await page.type(
    "[id='consolidatedAddresses.ui_address_2.street']",
    "2785 14th St"
  );
  await page.type(
    "[id='consolidatedAddresses.ui_address_2.city']",
    "San Pablo"
  );
  await page.select("[id='consolidatedAddresses.ui_address_2.state']", "CA");
  await page.type("[id='consolidatedAddresses.ui_address_2.zipcode']", "94806");
  await page.type("[id='user.emailAddress']", "ininorones@gmail.com");
  await page.type("[id='user.phone']", "5106853884");
  await page.waitFor(1000);
  await page.$eval("[class='btn btn-lg btn-block btn-secondary']", (element) =>
    element.click()
  );
  await page.waitFor(5000);
  await page.type("[id='optimized-cc-card-number']", "4651963205549150");
  await page.select("[name='expiration-month']", "09");
  await page.select("[name='expiration-year']", "2023");
  await page.type("[id='credit-card-cvv']", "914");
  await page.waitFor(5000);
  await page.$eval("[class='btn btn-lg btn-block btn-primary']", (element) =>
    element.click()
  );
};
const fillCard = async (page) => {
  await page.waitFor(5000);
  await page.type("[id='optimized-cc-card-number']", "4651963205549150");
  await page.select("[name='expiration-month']", "09");
  await page.select("[name='expiration-year']", "2023");
  await page.type("[id='credit-card-cvv']", "914");
  await page.waitFor(5000);
  await page.$eval("[class='btn btn-lg btn-block btn-primary']", (element) =>
    element.click()
  );
};
// start to start the scalping
// init.addEventListener("click", function (e) {
//   e.preventDefault();
//   alert("Hello");
//     startBrowser();
// });

const testInit = async () => {
  const page = await startBrowser();
  await addToCart(page);
  await fillInfo(page);
  await fillCard(page);
};
testInit();
