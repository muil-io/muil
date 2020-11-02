import { useQuery } from 'react-query';
import useOptimisticMutation from 'shared/hooks/useOptimisticMutation';
import useProjects from 'shared/hooks/useProjects';
import * as api from 'shared/services/api';
import * as apiKeysApi from '../services/api';

const apiKeysStore = () => {
  const { selectedProject } = useProjects();
  const storeKey = [selectedProject, 'apiKeys'];
  const { isLoading, data } = useQuery(() => selectedProject && storeKey, api.fetchApiKeys);

  const toggleKey = useOptimisticMutation(
    storeKey,
    ({ prefix, isActive }) => {
      if (isActive) {
        return apiKeysApi.enableKey({ projectId: selectedProject, prefix });
      } else {
        return apiKeysApi.disableKey({ projectId: selectedProject, prefix });
      }
    },
    ({ previousData, prefix, isActive }) =>
      previousData.map((key) =>
        key.apiKeyPrefix === prefix ? { ...key, enabled: isActive } : key,
      ),
  );

  const createNewKey = useOptimisticMutation(
    storeKey,
    ({ name }) => apiKeysApi.createKey({ projectId: selectedProject, name }),
    ({ previousData, name }) => [...previousData, { name }],
    { refetchOnSuccess: true },
  );

  const deleteKey = useOptimisticMutation(
    storeKey,
    ({ prefix }) => apiKeysApi.deleteKey({ projectId: selectedProject, prefix }),
    ({ previousData, prefix }) =>
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
