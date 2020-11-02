import styled, { css } from 'styled-components';

export const header1 = css`
	font-size: 28px;
	font-weight: 500;
`;

export const Header1 = styled.h1`
	${header1};
`;

export const header2 = css`
	font-size: 18px;
	font-weight: 700;
`;

export const Header2 = styled.h2`
	${header2};
`;

export const header2Light = css`
	font-size: 18px;
	font-weight: 400;
`;

export const Header2Light = styled.h2`
	${header2Light};
`;

export const header3 = css`
	font-size: 16px;
	font-weight: 400;
`;

export const Header3 = styled.h3`
	${header3};
`;

export const header4 = css`
	font-size: 14px;
	font-weight: 400;
`;

export const Header4 = styled.h3`
	${header4};
`;

export const header4SemiBold = css`
	font-size: 14px;
	font-weight: 500;
`;

export const Header4SemiBold = styled.h4`
	${header4SemiBold};
`;

export const bodySmall = css`
	font-size: 11px;
	font-weight: 400;
`;

export const BodySmall = styled.p`
	${bodySmall};
`;

export const ellipsis = css`
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
`;

export const Ellipsis = styled.div`
	${ellipsis};
`;
