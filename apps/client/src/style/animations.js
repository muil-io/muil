import { keyframes } from 'styled-components';

export const slideIn = keyframes`
	0%{opacity: 0; transform: scale(0.5);}
	100%{opacity: 1; transform: scale(1);}
`;

export const shrinkAndTall = keyframes`
	0%{transform: scale(1, 1);}
	50%{transform: scale(0.7, 1.2);}
	100%{transform: scale(1, 1);}
`;

export const fadeIn = keyframes`
	0%{transform: scale(0.5);}
	90%{transform: scale(1.05);}
	100%{transform: scale(1);}
`;

export const easeSlideIn = keyframes`
	0%{width: 0;}
	100%{width: 100%;}
`;

export const fadeOut = keyframes`
	0%{opacity: 1;}
	100%{opacity: 0;}
`;

export const slideInFromBottom = keyframes`
	0%{transform: scaleY(0);}
	100%{transform: scaleY(1);}
`;

export const semiFadeIn = keyframes`
	0%{transform: scale(0.95);}
	100%{transform: scale(1);}
`;
