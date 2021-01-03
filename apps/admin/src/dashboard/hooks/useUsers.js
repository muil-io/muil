import { useQuery } from 'react-query';
import * as api from 'shared/services/api';

const useUsers = () => {
  const { isLoading, data = {} } = useQuery('users', api.fetchUsers);

  return { isLoading, data };
};

export default useUsers;
