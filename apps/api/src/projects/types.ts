import { SmtpOptions } from 'shared/modules/mailer';

export type Project = {
  id?: string;
  name: string;
  plan?: 'free' | 'pro';
  smtp?: SmtpOptions;
};

export type Log = {
  id?: number;
  datetime?: string;
  projectId: string;
  branch: string;
  templateId: string;
  type: 'html' | 'pdf' | 'png' | 'email';
  status: 'success' | 'error';
  from?: string;
  to?: string;
  cc?: string;
  bcc?: string;
  subject?: string;
  errorMessage?: string;
};
