const express = require("express");
const Prometheus = require("prom-client");
const config = require("./config/config");
const {
  outlookService,
  questionService,
  mailgunService,
  outlookEmailService,
  indeedService,
  comicService
} = require("./lib/services");
const app = express();

app.use(express.json());

app.get("/ping", async (req, res) => {
  res.end("pong");
});

app.get("/comics", async (req, res) => {
  await comicService.sendComicEmail();
  console.log("/comics done");
  console.log("--------------------------");
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

  console.log("/quetions done");
  console.log("--------------------------");
  res.end();
});

app.get("/outlook", async (req, res) => {
  const name1 = outlookService.name1;
  const name2 = outlookService.name2;
  const isAvailable1 = await outlookService.accountNameIsAvailable(name1);
  const isAvailable2 = await outlookService.accountNameIsAvailable(name2);
  const message = `Names available ${name1}: ${isAvailable1} ${name2}: ${isAvailable2}`;
  const isMonday = new Date().getDay() === 1;

  console.log(message);
  console.log("--------------------------");

  if (isAvailable1 || isAvailable2) {
    await outlookEmailService.sendNameAvailableEmail(message);
  }

  if (isMonday) {
    await outlookEmailService.sendEmailReminder(message);
  }

  console.log("/outlook done");
  console.log("--------------------------");
  res.end();
});

app.get("/jobs", async (req, res) => {
  const region = req.query.region || "se";
  const title = req.query.title || "programmer";
  await indeedService.getJobPostings(region, title);
  console.log("/jobs done");
  console.log("--------------------------");
  res.end();
});

app.get("/metrics", (req, res) => {
  res.set("Content-Type", Prometheus.register.contentType);
  console.log("/metrics done");
  console.log("--------------------------");
  res.end(Prometheus.register.metrics());
});

module.exports = app;
