// import puppeteer from "puppeteer";
const puppeteer = require("puppeteer");
require("dotenv").config();

// uncomment below once it is ready to mount as chrome extension
// const init = document.querySelector(".start");

// add URL here
const gpu_URL =
  "https://www.bestbuy.com/site/insignia-8-oz-cleaning-dusters-2-pack/8045009.p?skuId=8045009";

// DOM needs to load and go to the product page
const startBrowser = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1366, height: 768 },
  });
  const page = await browser.newPage();
  await page.goto(gpu_URL);
  return page;
};

const addToCart = async (page) => {
  await page.waitForTimeout(3000);
  try {
    console.log("Adding item to cart");
    await page.$eval(
      "[class='btn btn-primary btn-lg btn-block btn-leading-ficon add-to-cart-button']",
      (element) => {
        element.click();
      }
    );
    await page.waitForTimeout(2000);
    // another page to add to go to cart
    console.log("Adding item to cart");
    await page.$eval(
      "[class='btn btn-secondary btn-sm btn-block ']",
      (element) => element.click()
    );
    await page.waitForTimeout(2500);
    console.log("Checking out");
    await page.$eval("[class='btn btn-lg btn-block btn-primary']", (element) =>
      element.click()
    );
    await page.waitForTimeout(3500);
    console.log("proceeding as guest");
    await page.$eval(
      "[class='btn btn-secondary btn-lg cia-guest-content__continue guest']",
      (element) => element.click()
    );
    await page.waitForTimeout(3000);
  } catch (error) {
    console.log(error + " out of stock");
    await page.reload();
    await addToCart(page);
  }
};
const fillInfo = async (page) => {
  await page.waitForTimeout(3000);

  try {
    console.log("filling up info");
    await page.waitForTimeout(2000);
    // personal info section
    await page.type(
      "[id='consolidatedAddresses.ui_address_2.firstName']",
      process.env.NAME
    );
    await page.type(
      "[id='consolidatedAddresses.ui_address_2.lastName']",
      process.env.LASTNAME
    );
    await page.type(
      "[id='consolidatedAddresses.ui_address_2.street']",
      process.env.STADDRESS
    );
    await page.type(
      "[id='consolidatedAddresses.ui_address_2.city']",
      process.env.CITY
    );
    await page.select(
      "[id='consolidatedAddresses.ui_address_2.state']",
      process.env.STATE
    );
    await page.type(
      "[id='consolidatedAddresses.ui_address_2.zipcode']",
      process.env.ZIP
    );
    await page.type("[id='user.emailAddress']", process.env.EMAIL);
    await page.type("[id='user.phone']", process.env.PHONE);
    await page.waitForTimeout(1000);
    await page.$eval(
      "[class='btn btn-lg btn-block btn-secondary']",
      (element) => element.click()
    );
    // end personal info and go to credit card page
  } catch (error) {
    console.log("running fill info again");
    await page.reload();
    await fillInfo(page);
  }
};
const fillCard = async (page) => {
  try {
    await page.waitForTimeout(3000);
    console.log("filling up credit");
    // fake credit card info selected and checks out the item
    await page.type("[id='optimized-cc-card-number']", process.env.CREDIT);
    await page.waitForTimeout(1500);
    await page.select("[name='expiration-month']", process.env.MONTH);
    await page.select("[name='expiration-year']", process.env.YEAR);
    await page.type("[id='credit-card-cvv']", process.env.CVV);
    await page.waitForTimeout(1000);
    await page.$eval("[class='btn btn-lg btn-block btn-primary']", (element) =>
      element.click()
    );

    console.log("Purchase complete!");
  } catch (error) {
    console.log("running fill card info again");
    await page.reload();
    await fillCard(page);
  }
};
// start to start the scalping
// init.addEventListener("click", function (e) {
//   e.preventDefault();
//   alert("Hello");
//     testInit();
// });

const testInit = async () => {
  try {
    const page = await startBrowser();
    await addToCart(page);
    await fillInfo(page);
    await fillCard(page);
  } catch (error) {
    console.log(error);
  }
};
testInit();
