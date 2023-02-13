import React from 'react';

import UsersList from '../components/UsersList';

const User = () => {
	const USERS = [
		{
			id: 'u1',
			name: 'Test User',
			image: 'https://this-person-does-not-exist.com/img/avatar-3bfde5518565f41f88dedbed244bc37c.jpg',
			places: '3',
		}
	];

	return (
		<UsersList items={USERS} />
	)
}

export default User;