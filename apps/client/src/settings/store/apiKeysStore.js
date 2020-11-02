import { useQuery } from 'react-query';
import useOptimisticMutation from 'shared/hooks/useOptimisticMutation';
import * as api from 'shared/services/api';

const apiKeysStore = () => {
  const storeKey = 'apiKeys';
  const { isLoading, data } = useQuery(storeKey, api.fetchApiKeys);

  const toggleKey = useOptimisticMutation(
    storeKey,
    ({ prefix, isActive }) => {
      if (isActive) {
        return api.enableKey({ prefix });
      }
      return api.disableKey({ prefix });
    },
    ({ previousData, prefix, isActive }) =>
      previousData.map((key) =>
        key.apiKeyPrefix === prefix ? { ...key, enabled: isActive } : key,
      ),
  );

  const createNewKey = useOptimisticMutation(
    storeKey,
    api.createKey,
    ({ previousData, name }) => [...previousData, { name }],
    { refetchOnSuccess: true },
  );

  const deleteKey = useOptimisticMutation(storeKey, api.deleteKey, ({ previousData, prefix }) =>
    previousData.filter(({ apiKeyPrefix }) => apiKeyPrefix !== prefix),
  );

  return {
    isLoading,
    data,
    toggleKey,
    createNewKey,
    deleteKey,
  };
};

export default apiKeysStore;
