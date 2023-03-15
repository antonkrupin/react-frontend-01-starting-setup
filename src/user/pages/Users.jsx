import React, { useState, useEffect } from 'react';

import UsersList from '../components/UsersList';

import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';

const User = () => {
	const [isUsersListLoading, setUsersListLoading] = useState(false);
	const [usersList, setUsersList] = useState();
	const [error, setError] = useState(null);
	
	useEffect(() => {
		const sendRequest = async () => {
			try {
				const response = await fetch('http://localhost:5000/api/users/');

				const responseData = await response.json();

				if (!response.ok) {
					throw new Error(responseData.message);
				}
				setUsersList(responseData.users);
				setUsersListLoading(false);
			} catch (err) {
				setUsersListLoading(false);
				setError(err.message);
			}
		}
		setUsersListLoading(true);
		sendRequest();
	}, []);

	const errorHandler = () => {
		setError(null);
	};

	return (
		<>
		<ErrorModal error={error} onClear={errorHandler} />
		{isUsersListLoading && (
			<div className="center">
				<LoadingSpinner asOverlay />
			</div>
		)}
		{!isUsersListLoading && usersList && <UsersList items={usersList} />}
		</>
	)
}

export default User;
