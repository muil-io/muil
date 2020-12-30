import styled from 'styled-components';
import logo from '../../assets/images/muil-logo.png';

const SIZES = {
  small: 32,
  medium: 80,
  big: 200,
};

const Logo = styled.img.attrs(() => ({ src: logo }))`
  height: ${({ size }) => SIZES[size]}px;
  width: ${({ size }) => SIZES[size]}px;
  border-radius: 8px;
`;

Logo.defaultProps = { size: 'big' };

export default Logo;
