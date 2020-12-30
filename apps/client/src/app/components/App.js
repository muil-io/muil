import React from 'react';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';
import useUser from 'shared/hooks/useUser';
import { FlexCenter, Spinner } from 'shared/components';
import BaseAppShell from './AppShell/AppShell';
import {
  Register,
  Login,
  ForgotPassword,
  SuccessfulForgotPassword,
  ResetPassword,
  InviteUser,
} from 'auth';

const LoaderWrapper = styled(FlexCenter)`
  height: 100vh;
`;

const AppShell = () => {
  const { isLoading, isAuth } = useUser({ enabled: true });

  if (isLoading) {
    return (
      <LoaderWrapper>
        <Spinner size={50} />
      </LoaderWrapper>
    );
  }

  if (!isAuth) {
    return <Redirect to="/login" />;
  }

  return <BaseAppShell />;
};

const App = () => (
  <Switch>
    <Route path="/register/" component={Register} />
    <Route path="/login" component={Login} />
    <Route path="/forgot/success" component={SuccessfulForgotPassword} />
    <Route path="/forgot" component={ForgotPassword} />
    <Route path="/reset/:token" component={ResetPassword} />
    <Route path="/invite/:token" component={InviteUser} />

    <Route path="/">
      <AppShell />
    </Route>
  </Switch>
);

export default App;
