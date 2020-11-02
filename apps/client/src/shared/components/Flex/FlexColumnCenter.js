import styled, { css } from 'styled-components';
import { flex } from './Flex';

export const flexColumnCenter = css`
	${flex};
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

export const FlexColumnCenter = styled.div`
	${flexColumnCenter};
`;
