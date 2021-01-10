import React from 'react';
import styled from 'styled-components';
import { Column } from 'react-virtualized';
import { Page, DropDown, Table, Header2 } from 'shared/components';
import SpinnerArea from 'shared/components/Spinner/SpinnerArea';
import { TIME_RANGE_OPTIONS } from 'shared/constants';
import usePersistedState from 'shared/hooks/usePersistedState';
import { dateRenderer } from 'shared/components/Table/cellRenderers';
import useUser from 'shared/hooks/useUser';
import useAdminLogs from '../hooks/useAdminLogs';
import useProjects from '../hooks/useProjects';
import useUsers from '../hooks/useUsers';
import Counter from './Counter';

const TimeRangeDropDown = styled(DropDown).attrs(() => ({ location: { right: 0 } }))`
  display: flex;
  justify-content: flex-end;
  margin: -20px 20px 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 30px;
  padding: 30px 10%;
`;

const TableWrapper = styled.div`
  padding: 30px 10%;
`;

const Title = styled(Header2)`
  margin-bottom: 20px;
`;

const Dashboard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = usePersistedState('timeRange', '7-days');

  const {
    data: { id: userId },
  } = useUser();

  const { isLoading: adminLogsLoading, data: logs } = useAdminLogs({ selectedTimeRange });
  const { isLoading: projectsLoading, data: projects, setProjectPlan } = useProjects();
  const { isLoading: usersLoading, data: users, setUserRole } = useUsers();

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

        <Counter title="Total Users" count={logs.totalUsersCount} showTrend={false} />

        <Counter title="New Projects" count={logs.newProjectsCount} trend={logs.newProjectsTrend} />

        <Counter title="New Users" count={logs.newUsersCount} trend={logs.newUsersTrend} />

        <Counter title="Email Sent" count={logs.emailsSent} trend={logs.emailsSentTrend} />
        <Counter title="HTML Renderers" count={logs.htmlRenders} trend={logs.htmlRendersTrend} />
        <Counter title="PDF Renderers" count={logs.pdfRenders} trend={logs.pdfRendersTrend} />
        <Counter title="PNG Renderers" count={logs.pngRenders} trend={logs.pngRendersTrend} />
      </Grid>

      <TableWrapper>
        <Title>Projects</Title>

        <Table
          items={projects}
          rowHeight={() => 60}
          noDataTitle="No Projects Found"
          defaultSortBy="name"
          defaultSortDirection="ASC"
          noDataSubTitle={<>No Projects</>}
          height={400}
        >
          <Column label="Name" dataKey="name" flexGrow={1} width={1} />
          <Column
            label="Plan"
            dataKey="plan"
            flexGrow={1}
            width={1}
            cellRenderer={({ rowData }) => (
              <select
                value={rowData.plan}
                onChange={(e) => setProjectPlan({ id: rowData.id, plan: e.target.value })}
              >
                <option>free</option>
                <option>pro</option>
              </select>
            )}
          />
          <Column
            label="Render Template"
            dataKey="renderTemplate"
            flexGrow={1}
            width={1}
            columnType="date"
          />
        </Table>
      </TableWrapper>

      <TableWrapper>
        <Title>Users</Title>
        <Table
          items={users}
          rowHeight={() => 60}
          noDataTitle="No Users Found"
          defaultSortBy="createdAt"
          defaultSortDirection="DESC"
          noDataSubTitle={<>No Users</>}
          height={400}
        >
          <Column label="Name" dataKey="name" flexGrow={1} width={1} />
          <Column label="Email" dataKey="email" flexGrow={1} width={1} />
          <Column label="Project" dataKey="projectId" flexGrow={1} width={1} />
          <Column
            label="Role"
            dataKey="role"
            flexGrow={1}
            width={1}
            cellRenderer={({ rowData }) =>
              rowData.id === userId ? (
                rowData.role
              ) : (
                <select
                  value={rowData.role}
                  onChange={(e) => setUserRole({ id: rowData.id, role: e.target.value })}
                >
                  <option>admin</option>
                  <option>muilAdmin</option>
                </select>
              )
            }
          />
          <Column
            label="Created At"
            dataKey="createdAt"
            flexGrow={1}
            width={1}
            columnType="date"
            cellRenderer={dateRenderer}
          />
        </Table>
      </TableWrapper>
    </Page>
  );
};

export default Dashboard;
