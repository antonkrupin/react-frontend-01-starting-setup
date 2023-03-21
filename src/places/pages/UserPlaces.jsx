import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import PlaceList from '../components/PlaceList';

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import { useHttpClient } from '../../shared/hooks/http-hook';

const UserPlaces = () => {
	const uid = useParams().uid;

	const [userPlaces, setUserPlaces] = useState([]);

	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const fetchPlaces = async () => {
		try {
			const responseData = await sendRequest(
				`http://localhost:5000/api/places//user/${uid}`,
			);
			setUserPlaces(responseData.userPlaces);
		} catch (err) {

		}
	}

	useEffect(() => {
		fetchPlaces();
	}, []);
	
	return (
		<>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && <LoadingSpinner asOverlay />}
			<PlaceList items={userPlaces} />
		</>
	)
};

export default UserPlaces;