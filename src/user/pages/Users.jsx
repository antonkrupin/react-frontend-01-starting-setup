import React, { useState, useEffect } from 'react';

import UsersList from '../components/UsersList';

import { useHttpClient } from '../../shared/hooks/http-hook';

import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';

const User = () => {
	const [usersList, setUsersList] = useState();

	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const responseData = await sendRequest('http://localhost:5000/api/users/');

				setUsersList(responseData.users);
			} catch (err) {}
		}
		fetchUsers();
	}, [sendRequest]);

	return (
		<>
		<ErrorModal error={error} onClear={clearError} />
		{isLoading && (
			<div className="center">
				<LoadingSpinner asOverlay />
			</div>
		)}
		{!isLoading && usersList && <UsersList items={usersList} />}
		</>
	)
}

export default User;
