import React from 'react';
import { useHistory } from 'react-router-dom';
import { queryCache } from 'react-query';
import userStore from 'shared/store/userStore';
import { DropDown } from 'shared/components';

const Profile = () => {
  const {
    data: { firstName },
  } = userStore();
  const { push } = useHistory();

  return (
    <DropDown
      options={[
        {
          label: 'Logout',
          value: 'logout',
          onClick: () => {
            queryCache.clear();
            push('/login');
          },
        },
      ]}
      location={{ right: 0 }}
    >
      {firstName}
    </DropDown>
  );
};

export default Profile;
