export type Log = {
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
