const OutlookService = require("./outlookService/OutlookService");
const OutlookEmailService = require("./outlookService/OutlookEmailService");
const MailgunService = require("./mailgunService/MailgunService");
const DilbertService = require("./dilbertService/DilbertService");
const ComitStripService = require("./comitStripService/ComitStripService");
const ComicService = require("./comicService/ComicService");

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
  comitStripService,
  dilbertService,
  comicService,
  mailgunService,
  outlookEmailService,
  outlookService
};
