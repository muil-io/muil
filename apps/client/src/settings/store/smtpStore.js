import { useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import useOptimisticMutation from 'shared/hooks/useOptimisticMutation';
import useProjects from 'shared/hooks/useProjects';
import * as api from 'shared/services/api';
import * as smtpApi from '../services/api';

const apiKeysStore = () => {
  const { selectedProject } = useProjects();
  const storeKey = [selectedProject, 'smtp'];
  const { isLoading, data } = useQuery(() => selectedProject && storeKey, api.fetchSmtp);
  const [testingConnecting, setTestingConnecting] = useState(false);
  const [testStatus, setTestStatus] = useState();

  const updateSmtp = useOptimisticMutation(
    storeKey,
    (settings) => smtpApi.updateSmtp({ projectId: selectedProject, settings }),
    ({ previousData, ...settings }) => settings,
  );

  const deleteSmtp = useOptimisticMutation(
    storeKey,
    () => smtpApi.deleteSmtp({ projectId: selectedProject }),
    () => ({}),
  );

  const testConnection = useCallback(
    async (settings) => {
      try {
        setTestingConnecting(true);
        await smtpApi.checkSmtp({ projectId: selectedProject, settings });
        setTestStatus('success');
      } catch (err) {
        setTestStatus(typeof err?.description === 'string' ? err?.description : err?.message);
      } finally {
        setTestingConnecting(false);
      }
    },
    [selectedProject],
  );

  return {
    isLoading,
    data,
    updateSmtp,
    deleteSmtp,
    testConnection,
    testingConnecting,
    testStatus,
  };
};

export default apiKeysStore;
