// import nodemailer from 'nodemailer';
// import SMTPConnection from 'nodemailer/lib/smtp-connection';
// import CryptoJS from 'crypto-js';
// import { defaultSmtpConfiguration } from '../constants';

// type SendMail = {
//   projectId: string;
//   from: string;
//   to: string | Array<string>;
//   cc: string | Array<string>;
//   bcc: string | Array<string>;
//   subject: string;
//   html: string;
//   attachments: Object[];
// };

// export const testSmtpServer = async ({ host, port, secure, user, pass }) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const connection = new SMTPConnection({
//         port,
//         host,
//         secure,
//       });

//       connection.on('error', (err) => {
//         reject(err);
//       });

//       connection.connect(() => {
//         connection.login({ credentials: { user, pass } }, () => {
//           if (connection.authenticated) {
//             connection.close();
//             resolve();
//           } else {
//             connection.close();
//             reject(connection.lastServerResponse);
//           }
//         });
//       });
//     } catch (err) {
//       reject(err);
//     }
//   });
// };

// export const sendMail = async ({
//   projectId,
//   from,
//   to,
//   cc,
//   bcc,
//   subject,
//   html,
//   attachments,
// }: SendMail) => {
//   const smtp =
//     (
//       await fireStore.getDocumentData({
//         collection: 'projects',
//         documentId: projectId,
//       })
//     )?.smtp ?? {};

//   const {
//     host = defaultSmtpConfiguration.host,
//     port = defaultSmtpConfiguration.port,
//     secure = defaultSmtpConfiguration.secure,
//     user = defaultSmtpConfiguration.user,
//     defaultFrom = defaultSmtpConfiguration.defaultFrom,
//   } = smtp;

//   const pass = smtp.pass
//     ? CryptoJS.AES.decrypt(smtp.pass, functions.config().db.encryption_key).toString(
//         CryptoJS.enc.Utf8,
//       )
//     : defaultSmtpConfiguration.pass;

//   const transporter = nodemailer.createTransport({
//     host,
//     port,
//     secure,
//     auth: {
//       user,
//       pass,
//     },
//   });

//   await transporter.sendMail({
//     from: from ?? defaultFrom,
//     to,
//     cc,
//     bcc,
//     subject,
//     html,
//     attachments,
//   });
// };
