const config = require("../../../config/config");
const logger = require("../../logging/logger");

class OutlookEmailService {
  constructor(mailgunService, outlookService) {
    this.mailgunService = mailgunService;
    this.outlookService = outlookService;
  }

  async sendNameAvailableEmail(message) {
    logger.info("sendNameAvailableEmail", message);
    return this.mailgunService.sendEmail(
      config.emails.mathiasJohansson,
      "Name is available",
      message
    );
  }

  async sendEmailReminder(message) {
    logger.info("sendEmailReminder", message);
    const reminderSubject = "The name check is still running";

    await this.mailgunService.sendEmail(
      config.emails.fredrikChristenson,
      reminderSubject,
      message
    );
    await this.mailgunService.sendEmail(
      config.emails.mathiasJohansson,
      reminderSubject,
      message
    );
  }
}

module.exports = OutlookEmailService;
