import React from 'react';
import styled from 'styled-components';
import { FlexMiddle, Logo as BaseLogo, header1 } from 'shared/components';
import media from 'style/media';

const Wrapper = styled(FlexMiddle)`
  display: none;
  box-sizing: border-box;
  padding: 10px 20px;
  height: 60px;

  ${media.tablet`display: flex;`}
`;

const StyledLogo = styled(BaseLogo)`
  border-radius: 3px;
  margin-right: 2px;
`;

const Text = styled.span`
  ${header1};
  color: ${({ theme }) => theme.colors.primary};
`;

const Logo = () => (
  <Wrapper>
    <StyledLogo size="small" />
    <Text>uil</Text>
  </Wrapper>
);

export default Logo;
