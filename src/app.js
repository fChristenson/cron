const express = require("express");
const config = require("./config/config");
const {
  outlookService,
  questionService,
  mailgunService,
  outlookEmailService,
  comicService
} = require("./lib/services");
const app = express();

app.use(express.json());

app.get("/comics", async (req, res) => {
  await comicService.sendComicEmail();
  res.end();
});

app.get("/questions", async (req, res) => {
  const questions = await questionService.getQuestions();
  const message = questions.join("\n");
  await mailgunService.sendEmail(
    config.emails.fredrikChristenson,
    "Questions",
    message
  );

  res.end();
});

app.get("/outlook", async (req, res) => {
  const name1 = outlookService.name1;
  const name2 = outlookService.name2;
  const isAvailable1 = await outlookService.accountNameIsAvailable(name1);
  const isAvailable2 = await outlookService.accountNameIsAvailable(name2);
  const message = `Names available ${name1}: ${isAvailable1} ${name2}: ${isAvailable2}`;
  const isMonday = new Date().getDay() === 1;

  if (isAvailable1 || isAvailable2) {
    await outlookEmailService.sendNameAvailableEmail(message);
  }

  if (isMonday) {
    await outlookEmailService.sendEmailReminder(message);
  }

  res.end();
});

module.exports = app;
