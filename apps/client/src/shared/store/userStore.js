import { useCallback } from 'react';
import { useQuery } from '../hooks/useQuery';
import * as api from '../services/api';
import useOptimisticMutation from '../hooks/useOptimisticMutation';

const userStore = () => {
	const storeKey = ['user', localStorage.getItem('refreshToken')];
	const { loading, error, data } = useQuery(storeKey, api.fetchUser, {
		retry: false,
		staleTime: 0,
	});

	const updateProfile = useOptimisticMutation(
		storeKey,
		({ firstName, lastName }) => api.updateProfile({ firstName, lastName }),
		({ previousData, firstName, lastName }) => ({ ...previousData, firstName, lastName }),
	);

	const updatePassword = useCallback(({ password }) => api.updatePassword({ password }), []);

	return { loading, isAuth: !error, data, updateProfile, updatePassword };
};

export default userStore;
