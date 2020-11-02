import { useQuery as origUseQuery } from 'react-query';

export * from 'react-query';

export const useQuery = (...args) => {
	const queryInfo = origUseQuery(...args);

	if (typeof queryInfo.query.queryHash === 'undefined') {
		queryInfo.status = 'loading';
	}

	return {
		...queryInfo,
		loading: queryInfo.status === 'loading' && queryInfo.status !== 'error',
		error: queryInfo.status === 'error',
	};
};
