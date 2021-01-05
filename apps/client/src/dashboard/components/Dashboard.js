import React from 'react';
import styled, { useTheme } from 'styled-components';
import dayjs from 'dayjs';
import { Page, FlexColumn, DropDown } from 'shared/components';
import media from 'style/media';
import SpinnerArea from 'shared/components/Spinner/SpinnerArea';
import { TIME_RANGE_OPTIONS, SHORT_DATE_AND_TIME_FORMAT, ACTIVITIES_MAP } from 'shared/constants';
import useLogs from 'shared/hooks/useLogs';

import Counter from './Counter';
import Chart from './Chart';
import CountTable from './CountTable';
import useDashboardData from '../hooks/useDashboardData';

const TimeRangeDropDown = styled(DropDown).attrs(() => ({ location: { right: 0 } }))`
  display: flex;
  justify-content: flex-end;
  margin: -20px 20px 20px;
`;

const Row = styled(FlexColumn)`
  flex-wrap: wrap;
  ${media.tablet`flex-direction: row;`}
`;

const Dashboard = () => {
  const theme = useTheme();
  const { isLoading, data = [], selectedTimeRange, setSelectedTimeRange } = useLogs({
    perPage: 100000,
  });

  const { groups, formattedData, topTemplates, lastErrors } = useDashboardData({ data });

  if (isLoading) {
    return <SpinnerArea />;
  }

  return (
    <Page>
      <TimeRangeDropDown
        selectedValue={selectedTimeRange}
        onChange={({ value }) => setSelectedTimeRange(value)}
        options={TIME_RANGE_OPTIONS}
      />

      <Row>
        {Object.entries(ACTIVITIES_MAP).map(([key, { title, color, icon: Icon }]) => (
          <Counter
            key={key}
            title={title}
            navigate={`/activities/${key}`}
            count={groups[key]?.length}
            renderIcon={() => <Icon />}
            color={theme.colors[color]}
          />
        ))}
      </Row>

      <Row>
        <Chart selectedTimeRange={selectedTimeRange} data={formattedData} />
      </Row>

      <Row>
        {topTemplates.length > 0 && (
          <CountTable
            title="Top 10 Templates"
            data={topTemplates}
            columns={[
              { label: 'Template', key: 'displayName', flex: 2 },
              { label: 'Branch', key: 'branch', hideOnSmallView: true },
              { label: 'Renderers', key: 'value' },
            ]}
          />
        )}

        {lastErrors.length > 0 && (
          <CountTable
            title="Last 10 Errors"
            data={lastErrors}
            columns={[
              {
                label: 'Time',
                key: 'datetime',
                formatter: (value) => dayjs(value).format(SHORT_DATE_AND_TIME_FORMAT),
              },
              { label: 'Template', key: 'displayName', hideOnSmallView: true },
              { label: 'Error', key: 'error', flex: 3 },
            ]}
          />
        )}
      </Row>
    </Page>
  );
};

export default Dashboard;
