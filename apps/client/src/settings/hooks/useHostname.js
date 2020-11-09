import { useQuery } from 'react-query';
import useOptimisticMutation from 'shared/hooks/useOptimisticMutation';
import * as api from 'shared/services/api';

const useHostname = () => {
  const storeKey = 'hostname';
  const { isLoading, data } = useQuery(storeKey, api.fetchHostname);

  const updateHostname = useOptimisticMutation(
    storeKey,
    api.updateHostname,
    ({ previousData, ...settings }) => settings,
  );

  const deleteHostname = useOptimisticMutation(
    storeKey,
    () => api.updateHostname({ hostname: '' }),
    () => ({}),
  );

  return {
    isLoading,
    data,
    updateHostname,
    deleteHostname,
  };
};

export default useHostname;
