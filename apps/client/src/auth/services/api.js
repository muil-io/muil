import { get, post } from 'shared/services/api';

export const login = ({ email, password }) => post('/auth/login', { email, password });

export const register = ({ firstName, lastName, email, password }) =>
	post('/auth/signup', { firstName, lastName, email, password });

export const isProjectIdExists = (projectId) => get(`/projects/${projectId}`);

export const forgotPassword = ({ email }) => post('/auth/forgotPassword', { email });
