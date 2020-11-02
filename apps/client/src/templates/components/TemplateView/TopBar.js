import React from 'react';
import styled from 'styled-components';
import { FlexMiddle, Header2, card } from 'shared/components';
import ArrowIcon from 'shared/assets/icons/arrow2.svg';
import media from 'style/media';
import { SCREEN_SIZES } from '../../constants';

const Wrapper = styled(FlexMiddle)`
	${card};
	border-radius: 0;
	background: ${({ theme }) => theme.colors.primary};
	color: ${({ theme }) => theme.colors.white};
	padding: 6px 0;
	z-index: 2;
`;

const ArrowButton = styled(ArrowIcon)`
	transform: rotate(-90deg);
	padding: 15px;
	cursor: pointer;
`;

const ScreensWrapper = styled(FlexMiddle)`
	display: none;
	flex: 1;
	justify-content: flex-end;
	margin: 0 20px;

	${media.tablet`display: flex;`}
`;

const ScreenLink = styled.div`
	display: inline-block;
	cursor: pointer;

	> svg {
		padding: 5px;
		box-sizing: content-box;

		circle {
			fill: ${({ active, theme }) => (!active ? theme.colors.primary : theme.colors.white)};
		}
		path {
			fill: ${({ active, theme }) => (active ? theme.colors.primary : theme.colors.white)};
		}
	}
`;

const TopBar = ({ templateName, onExit, selectedSize, setSelectedSize }) => (
	<Wrapper>
		<ArrowButton onClick={onExit} />
		<Header2>{templateName}</Header2>

		<ScreensWrapper>
			{Object.keys(SCREEN_SIZES).map((sizeKey) => {
				const SizeIcon = SCREEN_SIZES[sizeKey].icon;

				return (
					<ScreenLink key={sizeKey} active={selectedSize === sizeKey} onClick={() => setSelectedSize(sizeKey)}>
						<SizeIcon />
					</ScreenLink>
				);
			})}
		</ScreensWrapper>
	</Wrapper>
);

export default TopBar;
