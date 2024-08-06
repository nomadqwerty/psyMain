const nodeMailer = require('nodemailer');
const path = require('path');
const { htmlToText } = require('html-to-text');

// manually set env TODO: please change this.

class Email {
  #prodHost;
  #port;
  #prodUser;
  #prodPass;
  constructor(user, url = '') {
    this.email = user.email;
    this.name = user.name;
    this.url = url;
    this.from = 'contact@hilightinterior.com';

    // private fields
    this.#prodHost = 'smtp.sendgrid.net';
    this.#port = 2525;
    this.#prodUser = 'apikey';
    this.#prodPass =
      '';
  }

  newTransport() {
    let auth = {
      user: this.#prodUser,
      pass: this.#prodPass,
    };
    // use sendgrid
    let transport = nodeMailer.createTransport({
      host: this.#prodHost,
      port: this.#port,
      auth,
    });
    return transport;
  }

  async send(subject, code) {
    // mail options
    const mailOptions = {
      from: this.from,
      to: this.email,
      subject,
      text: code,
    };

    let transporter = this.newTransport();
    let sent = await transporter.sendMail(mailOptions);

    return sent;
  }
  async sendHtml(subject, html) {
    // mail options
    const mailOptions = {
      from: this.from,
      to: this.email,
      subject,
      html,
      text: htmlToText.toString(html),
    };

    let transporter = this.newTransport();
    let sent = await transporter.sendMail(mailOptions);

    return sent;
  }
}

module.exports = Email;
