import React from 'react';
import { useHistory } from 'react-router-dom';
import { queryCache } from 'shared/hooks/useQuery';
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
						localStorage.removeItem('token');
						localStorage.removeItem('refreshToken');
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
