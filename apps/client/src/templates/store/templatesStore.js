import { useQuery, queryCache } from 'react-query';
import projectStore from 'shared/store/projectStore';
import * as api from 'shared/services/api';
import * as templatesApi from '../services/api';

import { useCallback } from 'react';

const templatesStore = () => {
  const { selectedProject } = projectStore();
  const storeKey = [selectedProject, 'templates'];
  const { isLoading, data } = useQuery(() => selectedProject && storeKey, api.fetchTemplates);

  const deleteBranch = useCallback(
    async ({ branch }) => {
      await templatesApi.deleteBranch({ projectId: selectedProject, branch });
      queryCache.refetchQueries(storeKey, { exact: true, force: true });
    },
    [selectedProject, storeKey],
  );

  return { isLoading, data, deleteBranch };
};

export default templatesStore;
