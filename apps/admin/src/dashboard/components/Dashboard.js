import React from 'react';
import styled from 'styled-components';
import { Page, Flex, DropDown } from 'shared/components';
import SpinnerArea from 'shared/components/Spinner/SpinnerArea';
import { TIME_RANGE_OPTIONS } from 'shared/constants';
import useAdminLogs from '../hooks/useAdminLogs';

import Counter from './Counter';

const TimeRangeDropDown = styled(DropDown).attrs(() => ({ location: { right: 0 } }))`
  display: flex;
  justify-content: flex-end;
  margin: -20px 20px 20px;
`;

const Row = styled(Flex)`
  flex-wrap: wrap;
`;

const Dashboard = () => {
  const { isLoading, data = [], selectedTimeRange, setSelectedTimeRange } = useAdminLogs();

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
        {data.map(({ title, value }, index) => (
          <Counter key={index} title={title} count={value} />
        ))}
      </Row>
    </Page>
  );
};

export default Dashboard;
