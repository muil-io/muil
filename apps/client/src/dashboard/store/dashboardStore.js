import { useMemo } from 'react';
import dayjs from 'dayjs';
import { useQuery } from 'react-query';
import projectStore from 'shared/store/projectStore';
import templatesStore from 'templates/store/templatesStore';
import * as api from 'shared/services/api';
import usePersistedState from 'shared/hooks/usePersistedState';
import { ACTIVITIES_MAP } from '../constants';

const dashboardStore = () => {
  const [selectedTimeRange, setSelectedTimeRange] = usePersistedState('timeRange', 7);
  const from = useMemo(() => dayjs().startOf('day').subtract(parseInt(selectedTimeRange), 'days'), [
    selectedTimeRange,
  ]);

  const { selectedProject } = projectStore();
  const { isLoading: templatesisLoading, data: templatesData = [] } = templatesStore();
  const { isLoading, data = [] } = useQuery(
    () => selectedProject && [selectedProject, from, 'activities'],
    api.fetchActivities,
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
    isLoading: isLoading || templatesisLoading,
    data: formattedData,
    selectedTimeRange: parseInt(selectedTimeRange),
    setSelectedTimeRange,
  };
};

export default dashboardStore;
