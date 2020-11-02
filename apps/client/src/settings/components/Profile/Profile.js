import React from 'react';
import styled from 'styled-components';
import media from 'style/media';
import { Card, Header3 } from 'shared/components';
import ChangeProfile from './ChangeProfile';
import ChangePassword from './ChangePassword';

const Wrapper = styled.div`
  margin: 0 auto;

  ${media.tablet`width: 80%;`}
  ${media.desktop`width: 60%;`}
`;

const Title = styled(Header3)`
  margin: 50px 0 10px;
`;

const Container = styled(Card).attrs(() => ({ level: 3 }))`
  margin: 0 auto 50px auto;
`;

const Profile = () => (
  <Wrapper>
    <Title>Profile</Title>
    <Container>
      <ChangeProfile />
    </Container>

    <Title>Change Password</Title>
    <Container>
      <ChangePassword />
    </Container>
  </Wrapper>
);

export default Profile;
