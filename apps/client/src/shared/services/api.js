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

export const fetchProjects = () => get('/projects');

export const fetchActivities = (selectedProject, from) =>
  get(`/projects/${selectedProject}/activities`, { from });

export const fetchTemplates = (selectedProject) => get(`/templates/${selectedProject}`);

export const fetchApiKeys = (selectedProject) => get(`/apiKeys/${selectedProject}`);

export const fetchSmtp = (selectedProject) => get(`/projects/${selectedProject}/smtp`);

export const updateProfile = (settings) => post('/auth/profile', settings);

export const updatePassword = ({ password }) => post('/auth/password', { password });

export const createProject = ({ projectName, projectId }) =>
  post(`/projects/${projectId}`, { projectName });
