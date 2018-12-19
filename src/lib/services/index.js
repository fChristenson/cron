const OutlookService = require("./outlookService/OutlookService");
const OutlookEmailService = require("./outlookService/OutlookEmailService");
const MailgunService = require("./mailgunService/MailgunService");
const DilbertService = require("./dilbertService/DilbertService");
const ComitStripService = require("./comitStripService/ComitStripService");
const ComicService = require("./comicService/ComicService");
const QuoraDigestService = require("./quoraDigestService/QuoraDigestService");
const QuestionService = require("./questionService/QuestionService");
const IndeedService = require("./indeedService/IndeedService");
const JobStatisticsService = require("./jobStatisticsService/JobStatisticsService");

const jobStatisticsService = new JobStatisticsService();
const indeedService = new IndeedService(jobStatisticsService);
const quoraDigestService = new QuoraDigestService();
const questionService = new QuestionService(quoraDigestService);
const comitStripService = new ComitStripService();
const dilbertService = new DilbertService();
const mailgunService = new MailgunService();
const comicService = new ComicService(
  mailgunService,
  dilbertService,
  comitStripService
);
const outlookService = new OutlookService();
const outlookEmailService = new OutlookEmailService(
  mailgunService,
  outlookService
);

module.exports = {
  jobStatisticsService,
  indeedService,
  quoraDigestService,
  questionService,
  comitStripService,
  dilbertService,
  comicService,
  mailgunService,
  outlookEmailService,
  outlookService
};
