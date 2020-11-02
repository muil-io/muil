import React, { useState } from 'react';
import styled from 'styled-components';
import { Card, Tabs, Tab } from 'shared/components';
import media from 'style/media';
import scrollbar from 'style/scrollbar';
import DynamicProps from './DynamicProps';
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
  padding: 16px;
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};

  position: absolute;
  top: 52px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden auto;
  ${scrollbar};
`;

const Options = ({ dynamicProps, setDynamicProps, baseTemplateUrl }) => {
  const [activeTab, setActiveTab] = useState('props');

  return (
    <Wrapper>
      <Tabs activeTab={activeTab} onTabChange={setActiveTab}>
        <Tab name="props">Dynamic Props</Tab>
        <Tab name="api">API</Tab>
      </Tabs>

      <Container isVisible={activeTab === 'props'}>
        <DynamicProps
          dynamicProps={dynamicProps}
          onChange={setDynamicProps}
          baseTemplateUrl={baseTemplateUrl}
        />
      </Container>

      <Container isVisible={activeTab === 'api'}>
        <Api
          dynamicProps={dynamicProps}
          onChange={setDynamicProps}
          baseTemplateUrl={baseTemplateUrl}
        />
      </Container>
    </Wrapper>
  );
};

export default Options;
