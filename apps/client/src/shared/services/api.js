import { get as _get, post as _post, put as _put, _delete } from 'shared/utils/http';

const httpOptions = {
  baseURL: process.env.BASE_URL,
  responseType: 'json',
  withCredentials: true,
  withHeaders: false,
};

export const get = (url, params = {}, options = {}) =>
  _get(url, { ...httpOptions, ...options, params });
export const post = (url, body = '', config) => _post(url, body, { ...httpOptions, ...config });
export const put = (url, body = '') => _put(url, body, { ...httpOptions });
export const httpDelete = (url, body, params = {}) =>
  _delete(url, { ...httpOptions, ...body, params });

export const login = ({ email, password }) => post('/auth/login', { email, password });

export const register = ({ name, email, password, projectName }) =>
  post('/auth/signup', { name, email, password, projectName });

export const fetchUser = () => get('/auth/me');

export const logout = () => post('/auth/logout');

export const forgotPassword = ({ email }) => post('/auth/forgotPassword', { email });

export const fetchProjects = () => get('/projects');

export const fetchActivities = (from) => get('/logs', { from });

export const fetchTemplates = () => get('/templates');

export const deleteBranch = ({ branch }) => httpDelete(`/templates/${branch}`);

export const fetchApiKeys = () => get('/apiKeys');

export const fetchSmtp = () => get('/smtp');

export const updateProfile = (settings) => post('/auth/profile', settings);

export const updatePassword = ({ password }) => post('/auth/password', { password });

export const createProject = ({ projectName, projectId }) =>
  post(`/projects/${projectId}`, { projectName });

export const enableKey = ({ prefix }) => post(`/apiKeys/${prefix}/enable`);

export const disableKey = ({ prefix }) => post(`/apiKeys/${prefix}/disable`);

export const createKey = ({ name }) => post('/apiKeys', { name });

export const deleteKey = ({ prefix }) => httpDelete(`/apiKeys/${prefix}`);

export const updateSmtp = ({ settings }) => post('/smtp', settings);

export const deleteSmtp = () => httpDelete('/smtp');

export const checkSmtp = ({ settings }) => post('/smtp/check', settings);

export const fetchCloudStorage = () => get('/assetsSettings');

export const updateCloudStorage = (settings) => post('/assetsSettings', settings);

export const deleteCloudStorage = () => httpDelete('/assetsSettings');
