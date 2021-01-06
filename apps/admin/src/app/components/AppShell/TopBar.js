import React from 'react';
import styled from 'styled-components';
import { FlexMiddle, FlexSpace } from 'shared/components';
import Logo from './Logo';
import Profile from './Profile';

const Wrapper = styled(FlexMiddle)`
  grid-area: header;
  background: ${({ theme }) => theme.colors.white};
  height: 50px;
  padding: 30px 0;
  box-sizing: border-box;
  box-shadow: 0 1px 3px 0 rgba(21, 27, 38, 0.15);
  z-index: 2;
  top: 0;
  position: sticky;
`;

const Container = styled(FlexSpace)`
  flex: 1;
  margin: 0 20px;
`;

const TopBar = () => (
  <Wrapper>
    <Container>
      <Logo size="small" />
      <Profile />
    </Container>
  </Wrapper>
);

export default TopBar;
