import { get as _get, post as _post, put as _put, _delete } from 'shared/utils/http';

const httpOptions = {
	baseURL: process.env.BASE_URL,
	responseType: 'json',
};

export const get = (url, params = {}, options = {}) => _get(url, { ...httpOptions, ...options, params });
export const post = (url, body = '', config) => _post(url, body, { ...httpOptions, ...config });
export const put = (url, body = '') => _put(url, body, { ...httpOptions });
export const httpDelete = (url, body, params = {}) => _delete(url, { ...httpOptions, ...body, params });

export const fetchWithToken = (url, params) =>
	get(url, params, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });

export const postWithToken = (url, params) =>
	post(url, params, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });

export const deleteWithToken = (url, params) =>
	httpDelete(url, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }, params);

export const refreshToken = () => post('/auth/refreshToken', { refreshToken: localStorage.getItem('refreshToken') });

export const fetchUser = () => fetchWithToken('/auth/me');

export const fetchProjects = () => fetchWithToken('/projects');

export const fetchActivities = (selectedProject, from) =>
	fetchWithToken(`/projects/${selectedProject}/activities`, { from });

export const fetchTemplates = (selectedProject) => fetchWithToken(`/templates/${selectedProject}`);

export const fetchApiKeys = (selectedProject) => fetchWithToken(`/apiKeys/${selectedProject}`);

export const fetchSmtp = (selectedProject) => fetchWithToken(`/projects/${selectedProject}/smtp`);

export const updateProfile = (settings) => postWithToken('/auth/profile', settings);

export const updatePassword = ({ password }) => postWithToken('/auth/password', { password });

export const createProject = ({ projectName, projectId }) => postWithToken(`/projects/${projectId}`, { projectName });
