import { useQuery } from 'shared/hooks/useQuery';
import useOptimisticMutation from 'shared/hooks/useOptimisticMutation';
import projectStore from 'shared/store/projectStore';
import * as api from 'shared/services/api';
import * as apiKeysApi from '../services/api';

const apiKeysStore = () => {
	const { selectedProject } = projectStore();
	const storeKey = [selectedProject, 'apiKeys'];
	const { loading, data } = useQuery(() => selectedProject && storeKey, api.fetchApiKeys);

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
			previousData.map((key) => (key.apiKeyPrefix === prefix ? { ...key, enabled: isActive } : key)),
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
		({ previousData, prefix }) => previousData.filter(({ apiKeyPrefix }) => apiKeyPrefix !== prefix),
	);

	return {
		loading,
		data,
		toggleKey,
		createNewKey,
		deleteKey,
	};
};

export default apiKeysStore;
