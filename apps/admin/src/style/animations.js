import { keyframes } from 'styled-components';

export const slideIn = keyframes`
	0%{opacity: 0; transform: scale(0.5);}
	100%{opacity: 1; transform: scale(1);}
`;

export const fadeIn = keyframes`
	0%{transform: scale(0.5);}
	90%{transform: scale(1.05);}
	100%{transform: scale(1);}
`;

export const semiFadeIn = keyframes`
	0%{transform: scale(0.95);}
	100%{transform: scale(1);}
`;
