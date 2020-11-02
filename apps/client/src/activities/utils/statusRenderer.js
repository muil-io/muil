import React from 'react';
import styled from 'styled-components';
import { FlexCenter } from 'shared/components';

const StatusSymbol = styled(FlexCenter)`
  width: 8px;
  height: 8px;
  border-radius: 100%;
  background: ${({ theme, isError }) => (isError ? theme.colors.error : theme.colors.success)};
  margin-right: 8px;
`;

const statusRenderer = ({ rowData: { status } }) => <StatusSymbol isError={status === 'error'} />;

export default statusRenderer;
