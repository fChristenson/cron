const fetch = require("node-fetch");
const puppeteer = require("puppeteer");

class OutlookService {
  constructor() {
    this.name1 = "mathiasjohansson";
    this.name2 = "mathias.johansson";
  }

  async getHeaders() {
    const res = await fetch("https://signup.live.com/");
    return res.headers;
  }

  async accountNameIsAvailable(name) {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox"]
    });
    const page = await browser.newPage();
    await page.goto("https://signup.live.com/signup");
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
