export type Project = {
  id?: string;
  name: string;
  plan?: 'free' | 'pro';
  smtp?: {
    defaultFrom?: string;
    host?: string;
    user?: string;
    pass?: string;
    port?: number;
    secure?: boolean;
  };
};
