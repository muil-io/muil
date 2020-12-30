import styled, { css } from 'styled-components';

const CARD_LEVEL = [
  '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
  '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
  '0 14px 28px rgba(0,0,0,0.03), 0 10px 10px rgba(0,0,0,0.03)',
  '0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0,0,0,.12);',
];

export const card = css`
  background: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ level = 0 }) => CARD_LEVEL[level]};
  border-radius: 8px;
  padding: 16px;
`;

export const Card = styled.div`
  ${card};
`;
