import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { FlexColumn } from 'shared/components';
import Dashboard from 'dashboard';
import TopBar from './TopBar';

const Wrapper = styled(FlexColumn)`
  flex: 1;
  height: 100vh;
`;

const AppShell = () => (
  <Wrapper>
    <TopBar />

    <Switch>
      <Redirect exact path="/" to="/dashboard" />
      <Route path="/dashboard" component={Dashboard} />
    </Switch>
  </Wrapper>
);

export default AppShell;
