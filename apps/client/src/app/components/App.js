import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ReactQueryConfigProvider } from 'react-query';
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
  const { isLoading, isAuth, logout } = useUser({ enabled: true });
  const queryConfig = useMemo(
    () => ({
      queries: {
        onError: (err) => {
          if (err?.statusCode === 401) {
            logout();
          }
        },
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

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

  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <BaseAppShell />
    </ReactQueryConfigProvider>
  );
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
