import React, { useState } from 'react';
import styled from 'styled-components';
import { Header1, Header3 } from '../Typography';
import { Flex, FlexMiddle } from '../Flex';
import scrollbar from 'style/scrollbar';

const Wrapper = styled.div`
  flex: 1;
  padding: 30px;
  overflow: auto;
  ${scrollbar};
`;

const TitleRow = styled(FlexMiddle)`
  margin-bottom: 20px;
`;

const Title = styled(Header1)`
  margin: 0;
  margin-right: 20px;
`;

const Tabs = styled(Flex)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray2};
  margin-top: -10px;
  margin-bottom: 20px;
`;

const Tab = styled(Header3)`
  margin: 0 30px 0 0;
  padding: 10px 2px;
  border-bottom: 2px solid transparent;
  cursor: pointer;

  ${({ isActive, theme }) => isActive && `border-bottom-color: ${theme.colors.primary}`}
`;

const Content = styled.div`
  position: relative;
  max-width: 1280px;
  margin: 0 auto;
`;

const Page = ({ title, tabs, renderRight, children }) => {
  const [activeTab, setActiveTab] = useState(tabs ? tabs[0].value : null);

  return (
    <Wrapper>
      <TitleRow>
        {title && <Title>{title}</Title>}
        {renderRight?.()}
      </TitleRow>

      {tabs && (
        <Tabs>
          {tabs.map(({ label, value }) => (
            <Tab key={value} isActive={activeTab === value} onClick={() => setActiveTab(value)}>
              {label}
            </Tab>
          ))}
        </Tabs>
      )}

      <Content>
        {tabs
          ? React.Children.map(children, (child) => (child.props.tab === activeTab ? child : null))
          : children}
      </Content>
    </Wrapper>
  );
};

export default Page;
