import { useQuery, queryCache, useMutation } from 'react-query';
import useProjects from './useProjects';
import * as api from '../services/api';

const useTemplates = () => {
  const { selectedProject } = useProjects();
  const storeKey = [selectedProject, 'templates'];
  const { isLoading, data } = useQuery(storeKey, api.fetchTemplates, { enabled: selectedProject });

  const [deleteBranch] = useMutation(
    ({ branch }) => api.deleteBranch({ projectId: selectedProject, branch }),
    { onSuccess: () => queryCache.refetchQueries(storeKey, { exact: true, force: true }) },
  );

  return { isLoading, data, deleteBranch };
};

export default useTemplates;
