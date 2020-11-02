import { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery, queryCache } from 'react-query';
import * as api from '../services/api';

const dataGetter = async () => {
  const data = await api.fetchProjects();
  const formattedProjects = data.map(({ name, id }) => ({ label: name, value: id }));

  return {
    projects: formattedProjects,
    selectedProject: formattedProjects?.[0]?.value,
  };
};

const projectStore = () => {
  const storeKey = 'projects';
  const { isLoading, data } = useQuery(storeKey, dataGetter, { staleTime: 5 * 60 * 1000 });
  const { replace } = useHistory();
  const { push } = useHistory();

  useEffect(() => {
    if (data?.projects?.length === 0) {
      replace('/create-project');
    }
  }, [data, replace]);

  const setSelectedProject = useCallback(
    (value) =>
      queryCache.setQueryData('projects', (oldData) => ({ ...oldData, selectedProject: value })),
    [],
  );

  const createProject = useCallback(
    async ({ projectName, projectId }) => {
      await api.createProject({ projectName, projectId });
      await queryCache.refetchQueries(storeKey, { exact: true, force: true });
      push('/dashboard');
    },
    [push],
  );

  return {
    isLoading,
    projects: data?.projects,
    selectedProject: data?.selectedProject,
    setSelectedProject,
    createProject,
  };
};

export default projectStore;
