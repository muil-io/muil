import { useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import useOptimisticMutation from 'shared/hooks/useOptimisticMutation';
import * as api from 'shared/services/api';

const apiKeysStore = () => {
  const storeKey = 'smtp';
  const { isLoading, data } = useQuery(storeKey, api.fetchSmtp);
  const [testingConnecting, setTestingConnecting] = useState(false);
  const [testStatus, setTestStatus] = useState();

  const updateSmtp = useOptimisticMutation(
    storeKey,
    (settings) => api.updateSmtp({ settings }),
    ({ previousData, ...settings }) => settings,
  );

  const deleteSmtp = useOptimisticMutation(storeKey, api.deleteSmtp, () => ({}));

  const testConnection = useCallback(async (settings) => {
    try {
      setTestingConnecting(true);
      await api.checkSmtp({ settings });
      setTestStatus('success');
    } catch (err) {
      setTestStatus(typeof err?.description === 'string' ? err?.description : err?.message);
    } finally {
      setTestingConnecting(false);
    }
  }, []);

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
