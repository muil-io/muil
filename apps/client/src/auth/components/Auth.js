import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FlexCenter, card, Logo as BaseLogo, flexColumn, Header1, Header3, header4 } from 'shared/components';

const Wrapper = styled(FlexCenter)`
	width: 100%;
	min-height: 100%;
`;

const Container = styled.div.attrs(() => ({ level: 4 }))`
	${flexColumn};
	${card};
	text-align: center;
	margin: 20px 10px;
	width: 100%;
	max-width: 350px;
	min-width: 200px;
`;

const Logo = styled(BaseLogo)`
	margin: 14px auto 20px;
`;

const Title = styled(Header1)`
	color: ${({ theme }) => theme.colors.dark};
`;

const SubTitle = styled(Header3)`
	margin-bottom: 26px;
	margin-top: 0px;
	color: ${({ theme }) => theme.colors.dark};
`;

const Link = styled(NavLink)`
	display: block;
	${header4};
	text-decoration: none;
	color: ${({ theme }) => theme.colors.gray1};

	&:not(:first-child) {
		margin-top: 15px;
	}
`;

const Auth = ({ title, subtitle, children, linkText, linkUrl }) => (
	<Wrapper>
		<Container>
			<Logo size="medium" />
			<Title>{title}</Title>
			<SubTitle>{subtitle}</SubTitle>

			{children}

			<div>
				{linkText &&
					linkUrl &&
					linkText.map((text, index) => (
						<Link key={index} to={linkUrl[index]}>
							{text}
						</Link>
					))}
			</div>
		</Container>
	</Wrapper>
);

export default Auth;
