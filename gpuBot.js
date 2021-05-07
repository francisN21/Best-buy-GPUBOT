// import puppeteer from "puppeteer";
const puppeteer = require("puppeteer");

// const init = document.querySelector(".start");

const test_url =
  "https://www.bestbuy.com/site/insignia-monitor-wipes-80-pack-white/8041012.p?skuId=8041012";

const startBrowser = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(test_url);
  return page;
};

const addToCart = async (page) => {
  await page.$eval(
    "[class='btn btn-primary btn-lg btn-block btn-leading-ficon add-to-cart-button']",
    (element) => element.click()
  );
  await page.waitFor(2000);
  await page.$eval("[class='btn btn-secondary btn-sm btn-block ']", (element) =>
    element.click()
  );
  await page.waitFor(2000);
  await page.$eval("[class='btn btn-lg btn-block btn-primary']", (element) =>
    element.click()
  );
  await page.waitFor(3000);
  await page.$eval(
    "[class='btn btn-secondary btn-lg cia-guest-content__continue guest']",
    (element) => element.click()
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
};
testInit();
