import React, { useRef } from 'react';
import styled, { css } from 'styled-components';
import { NavLink as BaseLink } from 'react-router-dom';
import { FlexColumn, flexMiddle, header4, card } from 'shared/components';
import useOnClickOutside from 'shared/hooks/useOnClickOutside';
import scrollbar from 'style/scrollbar';
import media from 'style/media';
import BaseDashboardIcon from 'shared/assets/icons/dashboard.svg';
import BaseActivitiesIcon from 'shared/assets/icons/activities.svg';
import BaseTemplatesIcon from 'shared/assets/icons/templates.svg';
import BaseSettingsIcon from 'shared/assets/icons/settings.svg';
import BaseDocsIcon from 'shared/assets/icons/documentation.svg';
import Logo from './Logo';
import { SIDE_BAR_WIDTH } from '../constants';

const floatingMenu = css`
	top: 60px;
	transform: translateX(${({ isOpen }) => (isOpen ? 0 : -SIDE_BAR_WIDTH)}px);
`;

const fixedMenu = css`
	top: 0;
	transform: translateX(0px);
`;

const Wrapper = styled(FlexColumn)`
	grid-area: sidebar;
	${card};
	padding: 0;
	border-radius: 0;
	z-index: 2;
	width: ${SIDE_BAR_WIDTH}px;
	box-sizing: border-box;
	transition: 200ms;
	position: fixed;
	bottom: 0;

	${floatingMenu};
	${media.tablet`${fixedMenu}`}
`;

const Container = styled(FlexColumn)`
	flex: 1;
	padding: 20px 0 0;
	overflow: hidden auto;
	${scrollbar};
`;

const commonIcon = css`
	width: 20px;
	height: 20px;
`;

const DashboardIcon = styled(BaseDashboardIcon)`
	${commonIcon};
`;

const ActivitiesIcon = styled(BaseActivitiesIcon)`
	${commonIcon}
`;

const TemplatesIcon = styled(BaseTemplatesIcon)`
	${commonIcon};
`;

const SettingsIcon = styled(BaseSettingsIcon)`
	${commonIcon};
`;

const DocsIcon = styled(BaseDocsIcon)`
	${commonIcon};
`;

const Link = styled(BaseLink)`
	${header4};
	${flexMiddle};
	color: ${({ theme }) => theme.colors.gray1};
	text-decoration: none;
	padding: 15px 20px;
	border-left: 3px solid transparent;

	span {
		margin-left: 10px;
	}

	path {
		fill: ${({ theme }) => theme.colors.gray1};
	}

	&.active,
	&:hover {
		font-weight: 500;
		color: ${({ theme }) => theme.colors.primary};
		border-left-color: ${({ theme }) => theme.colors.primary};
		background: linear-gradient(
			to left,
			${({ theme }) => theme.colors.primary}05,
			${({ theme }) => theme.colors.primary}20
		);
		path {
			fill: ${({ theme }) => theme.colors.primary};
		}
	}
`;

const ExternalLinks = styled(FlexColumn)`
	flex: 1;
	justify-content: flex-end;

	a:first-child {
		border-top: 1px solid ${({ theme }) => theme.colors.gray2};
	}
`;

const A = styled.a`
	padding: 10px 15px;

	&:hover{
		background: transparent;
		border-left-color: transparent;
	}
`;

const SideBar = ({ isOpen, setIsOpen }) => {
	const ref = useRef();
	useOnClickOutside(ref, () => setIsOpen(false));

	return (
		<Wrapper isOpen={isOpen} ref={ref}>
			<Logo />

			<Container>
				<Link to="/dashboard" onClick={() => setIsOpen(false)}>
					<DashboardIcon />
					<span>Dashboard</span>
				</Link>

				<Link to="/activities" onClick={() => setIsOpen(false)}>
					<ActivitiesIcon />
					<span>Activities</span>
				</Link>

				<Link to="/templates" onClick={() => setIsOpen(false)}>
					<TemplatesIcon />
					<span>Templates</span>
				</Link>

				<Link to="/settings" onClick={() => setIsOpen(false)}>
					<SettingsIcon />
					<span>Settings</span>
				</Link>

				<ExternalLinks>
					<Link href="https://docs.muil.io/" as={A} target="_blank" onClick={() => setIsOpen(false)}>
						<DocsIcon />
						<span>Documentation</span>
					</Link>
				</ExternalLinks>
			</Container>
		</Wrapper>
	);
};

export default SideBar;
