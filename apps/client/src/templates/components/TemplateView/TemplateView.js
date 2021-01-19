import React, { useState } from 'react';
import styled from 'styled-components';
import { FlexColumn } from 'shared/components';
import useDebounce from 'shared/hooks/useDebounce';
import media from 'style/media';
import TopBar from './TopBar';
import Options from './Options';
import Iframe from './Iframe';
import { slideInFromBottom } from '../../../style/animations';

const Wrapper = styled(FlexColumn)`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: ${({ theme }) => theme.colors.gray3};
  z-index: 2;
  animation: ${slideInFromBottom} 0.5s;
  transform-origin: 100% 100%;
`;

const Container = styled(FlexColumn)`
  flex: 1;
  overflow: auto;

  ${media.tablet`flex-direction: row;`};
`;

const TemplateView = ({
  baseTemplateUrl,
  selectedBranch,
  selectedTemplate: { templateId, displayName: templateName, dynamicProps: defaultDynamicProps },
  onExit,
}) => {
  const [selectedSize, setSelectedSize] = useState('full');
  const [dynamicProps, setDynamicProps] = useState(defaultDynamicProps);
  const debouncedProps = useDebounce(dynamicProps, 500);

  return (
    <Wrapper>
      <TopBar {...{ templateName, onExit, selectedSize, setSelectedSize }} />

      <Container>
        <Options {...{ dynamicProps, setDynamicProps, baseTemplateUrl, templateName }} />
        <Iframe {...{ debouncedProps, selectedBranch, templateId, selectedSize }} />
      </Container>
    </Wrapper>
  );
};
export default TemplateView;
