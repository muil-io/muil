import { useMutation, useQuery, queryCache } from 'react-query';
import * as api from '../services/api';

const useUser = ({ enabled = false } = {}) => {
  const storeKey = 'user';
  const { isLoading, isFetching, isSuccess, data } = useQuery(storeKey, api.fetchUser, {
    retry: false,
    enabled,
  });

  const [login] = useMutation(api.login, {
    throwOnError: true,
    onSuccess: (newData) => queryCache.setQueryData(storeKey, newData),
  });

  const [register] = useMutation(api.register, {
    throwOnError: true,
    onSuccess: (newData) => queryCache.setQueryData(storeKey, newData),
  });

  const [updateProfile] = useMutation(api.updateProfile);

  const [updatePassword] = useMutation(api.updatePassword);

  const [logout] = useMutation(api.logout, { onSuccess: () => queryCache.clear() });

  return {
    isLoading: isLoading || isFetching,
    isAuth: isSuccess,
    data,
    login,
    register,
    updateProfile,
    updatePassword,
    logout,
  };
};

export default useUser;
