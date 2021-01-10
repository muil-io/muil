import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useUser from 'shared/hooks/useUser';
import { DropDown } from 'shared/components';
import ChangeProfile from './ChangeProfile';
import ChangePassword from './ChangePassword';

const Profile = () => {
  const {
    data: { name },
    logout,
  } = useUser();
  const { push } = useHistory();
  const [showChangeProfile, setShowChangeProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  return (
    <>
      <DropDown
        options={[
          { label: 'Profile', value: 'settings', onClick: () => setShowChangeProfile(true) },
          {
            label: 'Change Password',
            value: 'password',
            onClick: () => setShowChangePassword(true),
          },
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
        {name}
      </DropDown>

      {showChangeProfile && <ChangeProfile onClose={() => setShowChangeProfile(false)} />}

      {showChangePassword && <ChangePassword onClose={() => setShowChangePassword(false)} />}
    </>
  );
};

export default Profile;
