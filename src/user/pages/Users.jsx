import React from 'react';

import UsersList from '../components/UsersList';

const User = () => {
	const USERS = [
		{
			id: 'u1',
			name: 'Test User',
			image: 'https://this-person-does-not-exist.com/img/avatar-998be1935b28d45b47987b49b3647df4.jpg',
			places: '3',
		}
	];

	return (
		<UsersList items={USERS} />
	)
}

export default User;