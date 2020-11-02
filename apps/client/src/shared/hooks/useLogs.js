import { useMemo } from 'react';
import dayjs from 'dayjs';
import { useQuery } from 'react-query';
import * as api from '../services/api';
import usePersistedState from './usePersistedState';
import useProjects from './useProjects';
import useTemplates from './useTemplates';
import { ACTIVITIES_MAP } from '../constants';

const useLogs = () => {
  const [selectedTimeRange, setSelectedTimeRange] = usePersistedState('timeRange', 7);
  const from = useMemo(() => dayjs().startOf('day').subtract(parseInt(selectedTimeRange), 'days'), [
    selectedTimeRange,
  ]);

  const { selectedProject } = useProjects();
  const { isLoading: templatesLoading, data: templatesData = [] } = useTemplates();
  const { isLoading, data = [] } = useQuery(
    [selectedProject, from, 'activities'],
    api.fetchActivities,
    { enabled: selectedProject },
  );

  const templatesMap = useMemo(
    () =>
      templatesData.reduce(
        (prev, { branch, templateId, displayName }) => ({
          ...prev,
          [`${branch}-${templateId}`]: displayName,
        }),
        {},
      ),
    [templatesData],
  );

  const formattedData = useMemo(
    () =>
      data
        .filter(({ type }) => ACTIVITIES_MAP[type])
        .map((activity) => ({
          ...activity,
          displayName:
            templatesMap[`${activity.branch}-${activity.templateId}`] || activity.templateId,
        })),
    [data, templatesMap],
  );

  return {
    isLoading: isLoading || templatesLoading,
    data: formattedData,
    selectedTimeRange: parseInt(selectedTimeRange),
    setSelectedTimeRange,
  };
};

export default useLogs;
