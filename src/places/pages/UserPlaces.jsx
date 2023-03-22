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

	useEffect(() => {
		const fetchPlaces = async () => {
			try {
				const responseData = await sendRequest(
					`http://localhost:5000/api/places/user/${uid}`,
				);
				setUserPlaces(responseData.userPlaces);
			} catch (err) {}
		}
		fetchPlaces();
	}, [sendRequest, uid]);

	const placeDeletedHandler = (deletedPlaceId) => {
		setUserPlaces(prevPlaces => prevPlaces.filter(place => place.id !== deletedPlaceId));
	};
	
	return (
		<>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && <LoadingSpinner asOverlay />}
			<PlaceList items={userPlaces} onDeletePlace={placeDeletedHandler}/>
		</>
	)
};

export default UserPlaces;