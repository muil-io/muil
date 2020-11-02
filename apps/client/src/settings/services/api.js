import { postWithToken, deleteWithToken } from 'shared/services/api';

export const enableKey = ({ projectId, prefix }) => postWithToken(`/apiKeys/${projectId}/${prefix}/enable`);

export const disableKey = ({ projectId, prefix }) => postWithToken(`/apiKeys/${projectId}/${prefix}/disable`);

export const createKey = ({ projectId, name }) => postWithToken(`/apiKeys/${projectId}`, { name });

export const deleteKey = ({ projectId, prefix }) => deleteWithToken(`/apiKeys/${projectId}/${prefix}`);

export const updateSmtp = ({ projectId, settings }) => postWithToken(`/projects/${projectId}/smtp`, settings);

export const deleteSmtp = ({ projectId }) => deleteWithToken(`/projects/${projectId}/smtp`);

export const checkSmtp = ({ projectId, settings }) => postWithToken(`/projects/${projectId}/smtp/check`, settings);
