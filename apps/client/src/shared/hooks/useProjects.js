import { useCallback } from 'react';
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

const useProjects = () => {
  const storeKey = 'projects';
  const { isLoading, data } = useQuery(storeKey, dataGetter);

  const setSelectedProject = useCallback(
    (value) =>
      queryCache.setQueryData('projects', (oldData) => ({ ...oldData, selectedProject: value })),
    [],
  );

  return {
    isLoading,
    projects: data?.projects,
    selectedProject: data?.selectedProject,
    setSelectedProject,
  };
};

export default useProjects;
