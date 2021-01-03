import React from 'react';
import styled from 'styled-components';
import { Column } from 'react-virtualized';
import { Page, DropDown, Table } from 'shared/components';
import SpinnerArea from 'shared/components/Spinner/SpinnerArea';
import { TIME_RANGE_OPTIONS } from 'shared/constants';
import usePersistedState from 'shared/hooks/usePersistedState';
import useAdminLogs from '../hooks/useAdminLogs';
import useProjects from '../hooks/useProjects';
import useUsers from '../hooks/useUsers';

import Counter from './Counter';

const TimeRangeDropDown = styled(DropDown).attrs(() => ({ location: { right: 0 } }))`
  display: flex;
  justify-content: flex-end;
  margin: -20px 20px 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  padding: 0 10%;
`;

const TableWrapper = styled.div`
  padding: 30px 10%;
  max-height: 300px;
`;

const Dashboard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = usePersistedState('timeRange', 7);

  const { isLoading: adminLogsLoading, data: logs } = useAdminLogs({ selectedTimeRange });
  const { isLoading: projectsLoading, data: projects } = useProjects();
  const { isLoading: usersLoading } = useUsers();

  if (adminLogsLoading || projectsLoading || usersLoading) {
    return <SpinnerArea />;
  }

  return (
    <Page>
      <TimeRangeDropDown
        selectedValue={selectedTimeRange}
        onChange={({ value }) => setSelectedTimeRange(value)}
        options={TIME_RANGE_OPTIONS}
      />

      <Grid>
        <Counter title="Total Projects" count={logs.totalProjectsCount} showTrend={false} />

        <Counter title="New Projects" count={logs.newProjectsCount} trend={logs.newProjectsTrend} />

        <Counter
          title="Total Users"
          count={logs.emailsSent}
          trend={logs.totalUsersCount}
          showTrend={false}
        />

        <Counter title="New Users" count={logs.newUsersCount} trend={logs.newUsersTrend} />

        <Counter title="Email Sent" count={logs.emailsSent} trend={logs.emailsSentTrend} />
        <Counter title="HTML Renderers" count={logs.htmlRenders} trend={logs.htmlRendersTrend} />
        <Counter title="PDF Renderers" count={logs.pdfRenders} trend={logs.pdfRendersTrend} />
        <Counter title="PNG Renderers" count={logs.pngRenders} trend={logs.pngRendersTrend} />
      </Grid>

      <TableWrapper>
        <Table
          items={projects}
          rowHeight={() => 60}
          noDataTitle="No Projects Found"
          defaultSortBy="name"
          defaultSortDirection="ASC"
          noDataSubTitle={<>No Projects</>}
        >
          <Column label="Name" dataKey="name" flexGrow={1} width={1} />
          <Column label="Plan" dataKey="plan" flexGrow={1} width={1} />
          <Column
            label="Render Template"
            dataKey="renderTemplate"
            flexGrow={1}
            width={1}
            columnType="date"
          />
        </Table>
      </TableWrapper>

      {/* <TableWrapper>
        <Table
          items={users}
          rowHeight={() => 60}
          noDataTitle="No Users Found"
          defaultSortBy="name"
          defaultSortDirection="ASC"
          noDataSubTitle={<>No Users</>}
        >
          <Column label="Name" dataKey="name" flexGrow={1} width={1} />
          <Column label="Plan" dataKey="plan" flexGrow={1} width={1} />
          <Column
            label="Render Template"
            dataKey="renderTemplate"
            flexGrow={1}
            width={1}
            columnType="date"
          />
        </Table>
      </TableWrapper> */}
    </Page>
  );
};

export default Dashboard;
