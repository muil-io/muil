import React from 'react';
import { hot } from 'react-hot-loader/root';
import styled, { ThemeProvider } from 'styled-components';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ReactQueryConfigProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';
import { FlexColumn, PrivateRoute } from 'shared/components';
import GlobalStyle from './style/globalStyle';
import theme from './style/theme';
import { Register, CreateProject, Login, ForgotPassword, SuccessfulForgotPassword } from './auth';
import AppShell from './appShell';

const Page = styled(FlexColumn)`
	height: 100vh;
`;

const App = () => (
	<ThemeProvider theme={theme}>
		<ReactQueryConfigProvider config={{ staleTime: 5 * 1000, refetchOnWindowFocus: false }}>
			<>
				<Helmet>
					<link
						href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
						rel="stylesheet"
					/>
				</Helmet>
				<Page>
					<GlobalStyle />

					<Router>
						<Switch>
							<Route path="/register/" component={Register} />
							<Route path="/create-project/" component={CreateProject} />
							<Route path="/login" component={Login} />
							<Route path="/forgot/success" component={SuccessfulForgotPassword} />
							<Route path="/forgot" component={ForgotPassword} />
							<PrivateRoute component={AppShell} />
						</Switch>
					</Router>
				</Page>
				<ReactQueryDevtools />
			</>
		</ReactQueryConfigProvider>
	</ThemeProvider>
);

export default hot(App);
