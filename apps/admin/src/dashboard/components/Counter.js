import React from 'react';
import styled from 'styled-components';
import { Card, flexColumn, Header4SemiBold, Header1 } from 'shared/components';

const Wrapper = styled(Card).attrs(() => ({ level: 3 }))`
  ${flexColumn};
  background: ${({ theme }) => theme.colors.white};
  padding: 20px;
  border-radius: 4px;
  text-align: center;
`;

const Title = styled(Header4SemiBold)`
  color: ${({ theme }) => theme.colors.gray1};
  width: 100%;
  margin: 0;
  margin-bottom: 20px;
  text-align: center;
`;

const Count = styled(Header1)`
  font-size: 40px;
  color: ${({ theme }) => theme.colors.dark};
  padding: 24px 0;
`;

const Trend = styled.div`
  text-align: right;
  color: ${({ theme, isUp, isDown }) =>
    isUp ? theme.colors.success : isDown ? theme.colors.error : theme.colors.gray1};
`;

const Counter = ({ className, title, count, trend, showTrend = true }) => (
  <Wrapper className={className}>
    <Title>{title}</Title>
    <Count>{count?.toLocaleString()}</Count>
    {showTrend && (
      <Trend isUp={trend > 0} isDown={trend < 0}>
        {trend || 0}%
      </Trend>
    )}
  </Wrapper>
);

export default Counter;
