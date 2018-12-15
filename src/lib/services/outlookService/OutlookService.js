const puppeteer = require("puppeteer");
const config = require("../../../config/config");

class OutlookService {
  constructor() {
    this.name1 = config.outlook.name1;
    this.name2 = config.outlook.name2;
  }

  async accountNameIsAvailable(name) {
    console.log("accountNameIsAvailable");
    console.log("--------------------------");
    const browser = await puppeteer.launch({
      args: ["--no-sandbox"]
    });
    const page = await browser.newPage();
    await page.goto("https://signup.live.com/signup");
    console.log("Visitied: https://signup.live.com/signup");
    console.log("--------------------------");
    const selector = "#MemberName";
    await page.type(selector, `${name}@outlook.com`);
    console.log(`Typed: ${name}`);
    console.log("--------------------------");
    await page.click("#iSignupAction");
    console.log("Clicked submit");
    console.log("--------------------------");
    const response = await page.waitForResponse(req =>
      req.url().includes("CheckAvailableSigninNames")
    );
    const json = await response.json();
    await browser.close();
    return json.isAvailable;
  }
}

module.exports = OutlookService;
