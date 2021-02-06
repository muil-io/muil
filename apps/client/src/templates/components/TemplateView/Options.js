import React from 'react';
import styled from 'styled-components';
import { Card } from 'shared/components';
import media from 'style/media';
import scrollbar from 'style/scrollbar';
import Api from './Api';

const Wrapper = styled(Card).attrs(() => ({ level: 1 }))`
  position: relative;
  padding: 0;
  border-radius: 0;
  z-index: 1;
  min-height: 40vh;

  ${media.tablet`width: 300px;`}
`;

const Container = styled.div`
  box-sizing: border-box;
  padding: 20px 16px;
  position: absolute;
  height: 100%;
  overflow: hidden auto;
  ${scrollbar};
`;

const Options = ({ dynamicProps, setDynamicProps, selectedBranch, templateId, templateName }) => (
  <Wrapper>
    <Container isVisible>
      <Api
        dynamicProps={dynamicProps}
        onChange={setDynamicProps}
        selectedBranch={selectedBranch}
        templateId={templateId}
        templateName={templateName}
      />
    </Container>
  </Wrapper>
);

export default Options;
