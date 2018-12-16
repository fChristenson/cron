const puppeteer = require("puppeteer");

class QuoraDigestService {
  async getQuestions(topic = "Computer-Programming") {
    console.log("getQuestions", topic);
    console.log("--------------------------");
    const browser = await puppeteer.launch({
      args: ["--no-sandbox"]
    });
    const page = await browser.newPage();
    await page.goto(`https://www.quora.com/topic/${topic}/all_questions`);
    console.log(`Visited: https://www.quora.com/topic/${topic}/all_questions`);
    console.log("--------------------------");
    const elements = await page.$$(".pagedlist_item");
    const textContent = await Promise.all(
      elements.map(element => element.getProperty("textContent"))
    );
    const questions = await Promise.all(
      textContent.map(jsHandle => jsHandle.jsonValue())
    );
    await browser.close();
    return questions;
  }
}

module.exports = QuoraDigestService;
