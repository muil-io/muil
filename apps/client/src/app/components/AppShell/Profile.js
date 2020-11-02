import React from 'react';
import { useHistory } from 'react-router-dom';
import { queryCache } from 'react-query';
import useUser from 'shared/hooks/useUser';
import { DropDown } from 'shared/components';

const Profile = () => {
  const {
    data: { name },
  } = useUser();
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
      {name}
    </DropDown>
  );
};

export default Profile;
