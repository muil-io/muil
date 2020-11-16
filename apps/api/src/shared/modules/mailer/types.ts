export type EmailOptions = {
  subject: string;
  from?: string;
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
};

export type SmtpOptions = {
  defaultFrom?: string;
  host: string;
  user: string;
  pass?: string;
  port: number;
  secure: boolean;
};
