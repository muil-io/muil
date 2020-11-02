import { useQuery, queryCache, useMutation } from 'react-query';
import useProjects from './useProjects';
import * as api from '../services/api';

const useTemplates = () => {
  const { project } = useProjects();
  const storeKey = 'templates';
  const { isLoading, data } = useQuery(storeKey, api.fetchTemplates, { enabled: project });

  const [deleteBranch] = useMutation(api.deleteBranch, {
    onSuccess: () => queryCache.refetchQueries(storeKey, { exact: true, force: true }),
  });

  return { isLoading, data, deleteBranch };
};

export default useTemplates;
