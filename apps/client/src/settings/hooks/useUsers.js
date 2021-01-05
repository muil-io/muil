import { queryCache, useMutation } from 'react-query';
import * as api from 'shared/services/api';
import useInfiniteTable from '../../shared/hooks/useInfiniteTable';

const useUsers = () => {
  const storeKey = 'users';

  const {
    isLoading,
    isFetchingMore,
    data,
    fetchMore,
    canFetchMore,
    sort,
    handleSort,
  } = useInfiniteTable({
    dataKey: storeKey,
    apiFunc: api.fetchUsers,
    defaultSortBy: 'name',
    defaultSortDirection: 'ASC',
  });

  const [inviteUser] = useMutation(api.inviteUser);

  const [deleteUser] = useMutation(api.deleteUser, {
    onSuccess: () => queryCache.invalidateQueries(storeKey),
  });

  return {
    isLoading,
    isFetchingMore,
    data,
    fetchMore,
    canFetchMore,
    sort,
    handleSort,
    inviteUser,
    deleteUser,
  };
};

export default useUsers;
