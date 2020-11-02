import axios from 'axios';
import './refreshTokenInterceptor';

const api = (fn, args) =>
	fn
		.apply(axios, args)
		.then((res) => res?.data?.data || res?.data)
		.catch((err) => Promise.reject(err?.response?.data?.error || err?.response?.data || err?.response));

export const get = (...rest) => {
	return api(axios.get, rest);
};

export const post = (...rest) => {
	return api(axios.post, rest);
};

export const put = (...rest) => {
	return api(axios.put, rest);
};

export const _delete = (...rest) => {
	return api(axios.delete, rest);
};

export const delay = (data, millisecs = 1000) =>
	new Promise((resolve) => setTimeout(() => resolve(typeof data === 'function' ? data() : data), millisecs));
