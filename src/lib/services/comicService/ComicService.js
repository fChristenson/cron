const config = require("../../../config/config");
const logger = require("../../logging/logger");

class ComicService {
  constructor(mailgunService, dilberService, comitStripService) {
    this.mailgunService = mailgunService;
    this.dilberService = dilberService;
    this.comitStripService = comitStripService;
  }

  async sendComicEmail() {
    logger.info("sendComicEmail");
    const promises = [
      this.dilberService.getComicImageUrl(),
      this.comitStripService.getComicImageUrl()
    ];

    const urls = await Promise.all(promises);
    const imgTags = urls.filter(val => !!val).map(url => `<img src="${url}"/>`);
    const html = `<html>${imgTags}</html>`;

    logger.info(`Sending html: ${html}`);
    return this.mailgunService.sendHtmlEmail(
      config.emails.fredrikChristenson,
      "Comics",
      html
    );
  }
}

module.exports = ComicService;
