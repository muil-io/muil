import { SmtpOptions } from 'shared/modules/mailer';

export type Project = {
  id?: string;
  name: string;
  plan?: 'free' | 'pro';
  smtp?: SmtpOptions;
};
