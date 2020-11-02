import axios from 'axios';
import * as api from '../services/api';

const interceptor = axios.interceptors.response.use(
	(response) => {
		return response;
	},
	async (err) => {
		const originalReq = err.config;
		if (err.response.status === 401 && !originalReq._retry && localStorage.getItem('refreshToken')) {
			originalReq._retry = true;

			// prevent loop when requesting refresh token
			axios.interceptors.response.eject(interceptor);

			const { token } = await api.refreshToken();
			originalReq.headers.Authorization = `Bearer ${token}`;
			localStorage.setItem('token', token);

			return axios(originalReq);
		}

		throw err;
	},
);

export default interceptor;
