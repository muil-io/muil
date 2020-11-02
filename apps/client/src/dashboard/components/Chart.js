import React, { useMemo } from 'react';
import styled, { useTheme } from 'styled-components';
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { AutoSizer } from 'react-virtualized';
import dayjs from 'dayjs';
import { SHORT_DATE_FORMAT, LONG_DATE_FORMAT, ACTIVITIES_MAP } from 'shared/constants';
import { header4, header4SemiBold } from 'shared/components';

import BaseCard from './BaseCard';

const Wrapper = styled(BaseCard)`
  padding: 0;
  > h4 {
    padding: 20px;
  }
`;

const BaseChart = styled(AreaChart)`
  .recharts-cartesian-axis-tick-value {
    font-size: 11px;
    fill: ${({ theme }) => theme.colors.gray1};
  }
  .recharts-cartesian-axis-tick-line {
    display: none;
  }
  .recharts-default-tooltip {
    ${header4};

    .recharts-tooltip-label {
      margin-bottom: 10px !important;
      ${header4SemiBold};
      color: ${({ theme }) => theme.colors.gray1};
    }
  }
`;

const getDayBefore = (number) => {
  const today = new Date();
  const dayBefore = new Date(today.getFullYear(), today.getMonth(), today.getDate() - number);
  return dayBefore;
};

const filterByType = (activities, type) => activities.filter((activity) => activity.type === type);

const Chart = ({ selectedTimeRange, data }) => {
  const theme = useTheme();
  const groups = useMemo(() => {
    const days = [...Array(selectedTimeRange)].map((_, index) =>
      getDayBefore(selectedTimeRange - index - 1),
    );

    return days.map((day) => {
      const activities = data.filter(
        (activity) => new Date(activity.datetime).toDateString() === day.toDateString(),
      );

      return Object.entries(ACTIVITIES_MAP).reduce(
        (result, [key, { title }]) => ({
          ...result,
          [title]: filterByType(activities, key).length,
        }),
        { date: day.getTime() },
      );
    });
  }, [data, selectedTimeRange]);

  return (
    <Wrapper title="Activities Over Time">
      <AutoSizer disableHeight>
        {({ width }) => (
          <BaseChart
            width={width}
            height={245}
            data={groups}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          >
            <defs>
              {Object.values(ACTIVITIES_MAP).map(({ color }) => (
                <linearGradient key={color} id={color} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={theme.colors[color]} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={theme.colors[color]} stopOpacity={0.1} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid stroke={theme.colors.gray3} strokeDasharray="5 5" vertical={false} />
            <XAxis
              dataKey="date"
              tickMargin={5}
              tickFormatter={(value) => dayjs(value).format(SHORT_DATE_FORMAT)}
            />
            <YAxis hide />
            <Tooltip
              isAnimationActive={false}
              labelFormatter={(value) => dayjs(value).format(LONG_DATE_FORMAT)}
            />

            {Object.values(ACTIVITIES_MAP).map(({ title, color }) => (
              <Area
                key={title}
                type="monotone"
                dataKey={title}
                stroke={theme.colors[color]}
                fillOpacity={1}
                fill={`url(#${color})`}
              />
            ))}
          </BaseChart>
        )}
      </AutoSizer>
    </Wrapper>
  );
};

export default Chart;
