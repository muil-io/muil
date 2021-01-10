import { get as _get, post as _post, put as _put, _delete } from 'shared/utils/http';

const httpOptions = {
  baseURL: `${process.env.BASE_URL}/api`,
  responseType: 'json',
  withCredentials: true,
  withHeaders: false,
};

export const get = (url, params = {}, options = {}) =>
  _get(url, { ...httpOptions, ...options, params });
export const post = (url, body, config) => _post(url, body || '', { ...httpOptions, ...config });
export const put = (url, body = '') => _put(url, body, { ...httpOptions });
export const httpDelete = (url, body, params = {}) =>
  _delete(url, { ...httpOptions, ...body, params });

export const fetchUser = () => get('/users/me');

export const login = ({ email, password }) => post('/auth/login', { email, password });

export const logout = () => post('/auth/logout');

export const fetchLogs = (from) => get('/kpis/stats', { from });

export const fetchProjects = () => get('/kpis/projects');

export const fetchUsers = () => get('/kpis/users');

export const setUserRole = ({ id, role }) => post(`/users/${id}/role`, { role });

export const setProjectPlan = ({ id, plan }) => post(`/projects/${id}/plan`, { plan });
