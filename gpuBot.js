// import puppeteer from "puppeteer";
const puppeteer = require("puppeteer");

// const init = document.querySelector(".start");

const test_url =
  "https://www.bestbuy.com/site/nvidia-geforce-rtx-3070-8gb-gddr6-pci-express-4-0-graphics-card-dark-platinum-and-black/6429442.p?skuId=6429442";

const startBrowser = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(test_url);
  return page;
};

// const addToCart = async () => {

// }

startBrowser();
// start to start the scalping
// init.addEventListener("click", function (e) {
//   e.preventDefault();
//   alert("Hello");
//     startBrowser();
// });
