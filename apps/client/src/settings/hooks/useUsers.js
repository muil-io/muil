import { queryCache, useMutation, useQuery } from 'react-query';
import * as api from 'shared/services/api';

const useUsers = () => {
  const storeKey = 'users';
  const { isLoading, data } = useQuery(storeKey, api.fetchUsers);

  const [inviteUser] = useMutation(api.inviteUser);

  const [deleteUser] = useMutation(api.deleteUser, {
    onSuccess: () => queryCache.invalidateQueries(storeKey),
  });

  return { isLoading, data, inviteUser, deleteUser };
};

export default useUsers;
