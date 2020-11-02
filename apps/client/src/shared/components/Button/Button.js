import styled from 'styled-components';
import { header4 } from '../Typography';

const Button = styled.button`
  background: ${({ theme, buttonType = 'primary' }) => theme.button[buttonType].normal.background};
  color: ${({ theme, buttonType = 'primary' }) => theme.button[buttonType].normal.color};
  border: 1px solid ${({ theme, buttonType = 'primary' }) => theme.button[buttonType].normal.border};
  padding: 13px;
  margin: 4px 0;
  border-radius: 4px;
  cursor: pointer;
  transition: 200ms;
  ${header4};
  outline: none;

  &:hover {
    border: 1px solid
      ${({ theme, buttonType = 'primary' }) => theme.button[buttonType].hover.border};
    background: ${({ theme, buttonType = 'primary' }) => theme.button[buttonType].hover.background};
    color: ${({ theme, buttonType = 'primary' }) => theme.button[buttonType].hover.color};
  }

  &:disabled {
    cursor: no-drop;
    border: 1px solid
      ${({ theme, buttonType = 'primary' }) => theme.button[buttonType].disabled.border};
    background: ${({ theme, buttonType = 'primary' }) =>
      theme.button[buttonType].disabled.background};
    color: ${({ theme, buttonType = 'primary' }) => theme.button[buttonType].disabled.color};
  }
`;

export default Button;
