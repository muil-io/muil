import { useQuery, queryCache } from 'shared/hooks/useQuery';
import projectStore from 'shared/store/projectStore';
import * as api from 'shared/services/api';
import * as templatesApi from '../services/api';

import { useCallback } from 'react';

const templatesStore = () => {
	const { selectedProject } = projectStore();
	const storeKey = [selectedProject, 'templates'];
	const { loading, data } = useQuery(() => selectedProject && storeKey, api.fetchTemplates);

	const deleteBranch = useCallback(
		async ({ branch }) => {
			await templatesApi.deleteBranch({ projectId: selectedProject, branch });
			queryCache.refetchQueries(storeKey, { exact: true, force: true });
		},
		[selectedProject, storeKey],
	);

	return { loading, data, deleteBranch };
};

export default templatesStore;
