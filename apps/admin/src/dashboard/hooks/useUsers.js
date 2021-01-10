import { queryCache, useMutation, useQuery } from 'react-query';
import * as api from 'shared/services/api';

const useUsers = () => {
  const { isLoading, data = [] } = useQuery('users', api.fetchUsers);

  const [setUserRole] = useMutation(api.setUserRole, {
    onSuccess: () => queryCache.invalidateQueries('users'),
  });

  return { isLoading, data, setUserRole };
};

export default useUsers;
