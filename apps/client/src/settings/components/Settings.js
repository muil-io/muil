import React from 'react';
import { Page } from 'shared/components';
import ApiKeys from './ApiKeys';
import SMTP from './SMTP';
import CloudStorage from './CloudStorage';
import Profile from './Profile';
import Hostname from './Hostname';

const TABS = [
  { label: 'Api Keys', value: 'apiKeys' },
  { label: 'SMTP', value: 'smtp' },
  { label: 'Cloud Storage', value: 'cloudStorage' },
  !process.env.IS_CLOUD ? { label: 'Host Name', value: 'hostname' } : undefined,
  { label: 'Profile', value: 'profile' },
];

const Settings = () => (
  <Page title="Settings" tabs={TABS}>
    <ApiKeys tab="apiKeys" />
    <SMTP tab="smtp" />
    <CloudStorage tab="cloudStorage" />
    {!process.env.IS_CLOUD && <Hostname tab="hostname" />}
    <Profile tab="profile" />
  </Page>
);

export default Settings;
