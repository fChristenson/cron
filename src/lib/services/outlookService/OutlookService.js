const puppeteer = require("puppeteer");
const config = require("../../../config/config");
const logger = require("../../logging/logger");

class OutlookService {
  constructor() {
    this.name1 = config.outlook.name1;
    this.name2 = config.outlook.name2;
  }

  async accountNameIsAvailable(name) {
    logger.info("accountNameIsAvailable");
    const browser = await puppeteer.launch({
      args: ["--no-sandbox"]
    });
    const page = await browser.newPage();
    await page.goto("https://signup.live.com/signup");
    logger.info("Visitied: https://signup.live.com/signup");
    const selector = "#MemberName";
    await page.type(selector, `${name}@outlook.com`);
    await page.click("#iSignupAction");
    const response = await page.waitForResponse(req =>
      req.url().includes("CheckAvailableSigninNames")
    );
    const json = await response.json();
    await browser.close();
    return json.isAvailable;
  }
}

module.exports = OutlookService;
