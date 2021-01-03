import { useMemo } from 'react';
import dayjs from 'dayjs';
import { useQuery } from 'react-query';
import * as api from 'shared/services/api';

const useAdminLogs = ({ selectedTimeRange }) => {
  const from = useMemo(() => dayjs().startOf('day').subtract(parseInt(selectedTimeRange), 'days'), [
    selectedTimeRange,
  ]);

  const { isLoading, data = {} } = useQuery([from, 'logs'], api.fetchLogs);

  return { isLoading, data };
};

export default useAdminLogs;
