import React, { useState, useEffect, useMemo } from 'react';
import styled, { css } from 'styled-components';
import queryString from 'qs';
import { card, FlexColumn } from 'shared/components';
import { easeSlideIn, fadeOut } from 'style/animations';
import media from 'style/media';
import { SCREEN_SIZES } from '../../constants';

const Wrapper = styled(FlexColumn)`
  flex: 1;
  margin: 20px;
  transition: 200ms;
  max-height: 60vh;

  ${media.tablet`
		flex: unset;
		max-height: unset;
		margin: 20px auto;
		will-change: width;
		width: calc(100% - 350px);
		max-width: ${({ selectedSize }) => SCREEN_SIZES[selectedSize].size};
	`}
`;

const isLoadingAnimation = css`
  animation: ${easeSlideIn} 15s ease-out forwards;
`;

const loadedAnimation = css`
  animation: ${fadeOut} 200ms forwards;
  width: 100%;
`;

const IframeContainer = styled(FlexColumn)`
  flex: 1;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 2px;
    border-radius: 4px 4px 0 0;
    background: ${({ theme }) => theme.colors.primary};
    ${({ isisLoading }) => (isisLoading ? isLoadingAnimation : loadedAnimation)}
  }
`;

const BaseIframe = styled.iframe`
  ${card};
  padding: 0;
  border: none;
  background: ${({ theme }) => theme.colors.white};
  flex: 1;
`;

const Iframe = ({ debouncedProps, baseTemplateUrl, selectedSize }) => {
  const [isLoading, setisLoading] = useState(true);
  const qsProps = useMemo(() => queryString.stringify(debouncedProps), [debouncedProps]);

  useEffect(() => {
    setisLoading(true);
  }, [qsProps]);

  return (
    <Wrapper selectedSize={selectedSize}>
      <IframeContainer isisLoading={isLoading}>
        <BaseIframe src={`${baseTemplateUrl}?${qsProps}`} onLoad={() => setisLoading(false)} />
      </IframeContainer>
    </Wrapper>
  );
};

export default Iframe;
