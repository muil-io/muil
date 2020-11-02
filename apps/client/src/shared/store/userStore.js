import { useCallback } from 'react';
import { useQuery } from 'react-query';
import * as api from '../services/api';
import useOptimisticMutation from '../hooks/useOptimisticMutation';

const userStore = () => {
  const storeKey = 'user';
  const { isLoading, error, data } = useQuery(storeKey, api.fetchUser, {
    retry: false,
    staleTime: 0,
  });

  const updateProfile = useOptimisticMutation(
    storeKey,
    ({ firstName, lastName }) => api.updateProfile({ firstName, lastName }),
    ({ previousData, firstName, lastName }) => ({ ...previousData, firstName, lastName }),
  );

  const updatePassword = useCallback(({ password }) => api.updatePassword({ password }), []);

  return { isLoading, isAuth: !error, data, updateProfile, updatePassword };
};

export default userStore;
