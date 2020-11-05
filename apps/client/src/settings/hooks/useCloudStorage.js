import { useQuery } from 'react-query';
import useOptimisticMutation from 'shared/hooks/useOptimisticMutation';
import * as api from 'shared/services/api';

const useCloudStorage = () => {
  const storeKey = 'cloudStorage';
  const { isLoading, data } = useQuery(storeKey, api.fetchCloudStorage);

  const updateCloudStorage = useOptimisticMutation(
    storeKey,
    api.updateCloudStorage,
    ({ previousData, ...settings }) => settings,
  );

  const deleteCloudStorage = useOptimisticMutation(storeKey, api.deleteCloudStorage, () => ({}));

  return { isLoading, data, updateCloudStorage, deleteCloudStorage };
};

export default useCloudStorage;
