import React from 'react';
import { useHistory } from 'react-router-dom';
import useUser from 'shared/hooks/useUser';
import { DropDown } from 'shared/components';

const Profile = () => {
  const { data, logout } = useUser();
  const { push } = useHistory();

  return (
    <DropDown
      options={[
        {
          label: 'Logout',
          value: 'logout',
          onClick: async () => {
            await logout();
            push('/login');
          },
        },
      ]}
      location={{ right: 0 }}
    >
      {data?.name}
    </DropDown>
  );
};

export default Profile;
