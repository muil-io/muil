import React from 'react';
import styled, { css } from 'styled-components';
import { AutoSizer } from 'react-virtualized';
import { Flex } from 'shared/components';
import media from 'style/media';
import BaseCard from './BaseCard';

const Row = styled(Flex)`
  width: ${({ width }) => width}px;
  box-sizing: border-box;

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray3};
  }
`;

const hideCell = css`
  display: none;
  ${media.mobile`
		display: block;
	`}
`;

const Cell = styled.div`
  flex: ${({ flex }) => flex || 1};
  padding: 15px 15px 15px 0;
  font-size: 14px;
  line-height: 1.3;
  font-weight: 400;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 100%;
  ${({ theme, header }) => header && `color: ${theme.colors.gray1}; font-weight: 400`};

  > span {
    color: ${({ theme }) => theme.colors.gray1};
    font-size: 13px;
    font-weight: 300;
    margin-left: 5px;
  }

  ${({ hideOnSmallView }) => hideOnSmallView && hideCell};
`;

const CountTable = ({ data, title, columns }) => (
  <BaseCard title={title}>
    <AutoSizer disableHeight>
      {({ width }) => (
        <>
          <Row width={width}>
            {columns.map(({ label, key, flex, hideOnSmallView }) => (
              <Cell key={key} flex={flex} header hideOnSmallView={hideOnSmallView}>
                {label}
              </Cell>
            ))}
          </Row>

          {data.slice(0, 10).map((row, index) => (
            <Row key={index} width={width}>
              {columns.map(({ label, key, hintKey, flex, formatter, hideOnSmallView }) => (
                <Cell key={key} flex={flex} hideOnSmallView={hideOnSmallView}>
                  {formatter ? formatter(row[key]) : row[key]}
                </Cell>
              ))}
            </Row>
          ))}
        </>
      )}
    </AutoSizer>
  </BaseCard>
);

export default CountTable;
