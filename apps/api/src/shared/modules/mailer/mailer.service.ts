import nodemailer from 'nodemailer';
import SMTPConnection from 'nodemailer/lib/smtp-connection';
import { Injectable } from '@nestjs/common';
import { EmailOptions, SmtpOptions } from './types';

@Injectable()
export class MailerService {
  async send(
    html: string,
    attachments: any[],
    { from, to, cc, bcc, subject }: EmailOptions,
    smtpOptions: SmtpOptions,
  ) {
    const transporter = nodemailer.createTransport({
      host: smtpOptions.host,
      port: smtpOptions.port,
      secure: smtpOptions.secure,
      auth: {
        user: smtpOptions.user,
        pass: smtpOptions.pass,
      },
    });

    await transporter.sendMail({
      from: from ?? smtpOptions.defaultFrom,
      to,
      cc,
      bcc,
      subject,
      html,
      attachments,
    });
  }

  async test({ host, port, secure, user, pass }) {
    return new Promise((resolve, reject) => {
      try {
        const connection = new SMTPConnection({
          port,
          host,
          secure,
        });

        connection.on('error', (err) => {
          reject(err);
        });

        connection.connect(() => {
          connection.login({ credentials: { user, pass } }, () => {
            if (connection.authenticated) {
              connection.close();
              resolve();
            } else {
              connection.close();
              reject(connection.lastServerResponse);
            }
          });
        });
      } catch (err) {
        reject(err);
      }
    });
  }
}
