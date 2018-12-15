const config = require("../../../config/config");

class ComicService {
  constructor(mailgunService, dilberService, comitStripService) {
    this.mailgunService = mailgunService;
    this.dilberService = dilberService;
    this.comitStripService = comitStripService;
  }

  async sendComicEmail() {
    console.log("sendComicEmail");
    console.log("--------------------------");
    const promises = [
      this.dilberService.getComicImageUrl(),
      this.comitStripService.getComicImageUrl()
    ];

    const urls = await Promise.all(promises);
    console.log(`Resolved ${urls.length} comic urls`);
    console.log("--------------------------");
    const imgTags = urls.filter(val => !!val).map(url => `<img src="${url}"/>`);
    const html = `<html>${imgTags}</html>`;

    console.log(`Sending html: ${html}`);
    console.log("--------------------------");
    return this.mailgunService.sendHtmlEmail(
      config.emails.fredrikChristenson,
      "Comics",
      html
    );
  }
}

module.exports = ComicService;
