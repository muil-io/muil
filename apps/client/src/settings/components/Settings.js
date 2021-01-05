import React from 'react';
import { Page } from 'shared/components';
import ApiKeys from './ApiKeys';
import Users from './Users/Users';
import SMTP from './SMTP';
import CloudStorage from './CloudStorage';
import Profile from './Profile';
import Hostname from './Hostname';

const TABS = [
  { label: 'Users', value: 'users' },
  { label: 'Api Keys', value: 'apiKeys' },
  { label: 'SMTP', value: 'smtp' },
  { label: 'Cloud Storage', value: 'cloudStorage' },
  process.env.ENV !== 'CLOUD' ? { label: 'Host Name', value: 'hostname' } : undefined,
  { label: 'Profile', value: 'profile' },
];

const Settings = () => (
  <Page title="Settings" tabs={TABS}>
    <ApiKeys tab="apiKeys" />
    <Users tab="users" />
    <SMTP tab="smtp" />
    <CloudStorage tab="cloudStorage" />
    <Hostname tab="hostname" />
    <Profile tab="profile" />
  </Page>
);

export default Settings;
