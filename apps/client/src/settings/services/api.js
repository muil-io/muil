import { post, httpDelete } from 'shared/services/api';

export const enableKey = ({ projectId, prefix }) => post(`/apiKeys/${projectId}/${prefix}/enable`);

export const disableKey = ({ projectId, prefix }) =>
  post(`/apiKeys/${projectId}/${prefix}/disable`);

export const createKey = ({ projectId, name }) => post(`/apiKeys/${projectId}`, { name });

export const deleteKey = ({ projectId, prefix }) => httpDelete(`/apiKeys/${projectId}/${prefix}`);

export const updateSmtp = ({ projectId, settings }) =>
  post(`/projects/${projectId}/smtp`, settings);

export const deleteSmtp = ({ projectId }) => httpDelete(`/projects/${projectId}/smtp`);

export const checkSmtp = ({ projectId, settings }) =>
  post(`/projects/${projectId}/smtp/check`, settings);
