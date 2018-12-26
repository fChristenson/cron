const puppeteer = require("puppeteer");
const logger = require("../../logging/logger");

class QuoraDigestService {
  async getQuestions(topic = "Computer-Programming") {
    logger.info("getQuestions", topic);
    const browser = await puppeteer.launch({
      args: ["--no-sandbox"]
    });
    const page = await browser.newPage();
    await page.goto(`https://www.quora.com/topic/${topic}/all_questions`);
    logger.info(`Visited: https://www.quora.com/topic/${topic}/all_questions`);
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
