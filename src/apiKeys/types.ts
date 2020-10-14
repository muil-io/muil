export type ApiKey = {
  name: string;
  apiKeyPrefix: string;
  apiKeyHash?: string;
  createdAt: string;
  projectId?: string;
  enabled: boolean;
};
