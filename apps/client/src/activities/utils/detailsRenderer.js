import React from 'react';
import styled from 'styled-components';
import { ellipsis, header4SemiBold } from 'shared/components';

const Text = styled.div`
  flex: 1;
  ${ellipsis};
  line-height: 1.4;
  ${({ theme, isError }) => isError && `color: ${theme.colors.error}`};

  > span {
    ${header4SemiBold};
  }
`;

const detailsRenderer = ({ rowData: { type, from, to, cc, bcc, error, subject } }) => {
  if (type !== 'email') {
    return null;
  }

  return (
    <>
      <Text>
        <span>To:</span> {to}
      </Text>
      <Text>{subject}</Text>
      <Text isError>{error}</Text>
    </>
  );
};

export default detailsRenderer;
