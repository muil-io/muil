import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { FlexColumn } from 'shared/components';
import media from 'style/media';
import Dashboard from 'dashboard';
import Settings from 'settings';
import Templates from 'templates';
import Activities from 'activities';
import TopBar from './TopBar';
import SideBar from './SideBar';
import { SIDE_BAR_WIDTH } from '../constants';

const Wrapper = styled.div`
	flex: 1;
	display: grid;
	grid-template-columns: auto 1fr;
	grid-template-rows: auto 1fr;
	grid-template-areas:
		'sidebar header'
		'sidebar main';

	${media.tablet`grid-template-columns: ${SIDE_BAR_WIDTH}px 1fr;`}
`;

const Content = styled(FlexColumn)`
	grid-area: main;
`;

const AppShell = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Wrapper>
			<TopBar setIsOpen={setIsOpen} />
			<SideBar isOpen={isOpen} setIsOpen={setIsOpen} />

			<Content>
				<Switch>
					<Redirect exact path="/" to="/dashboard" />
					<Route path="/dashboard" component={Dashboard} />
					<Route path="/settings" component={Settings} />
					<Route path="/templates" component={Templates} />
					<Route path="/activities/:filter?" component={Activities} />
				</Switch>
			</Content>
		</Wrapper>
	);
};

export default AppShell;
