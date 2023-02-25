import React from 'react';
import { useParams } from 'react-router';

import PlaceList from '../components/PlaceList';

const DUMMY_PLACES = [
	{
		id: 'p1',
		title: 'Эрмитаж',
		description: 'Российский государственный музей изобразительного и декоративно-прикладного искусств, одно из крупнейших в мире учреждений подобного рода.',
		imageUrl: 'https://avatars.mds.yandex.net/get-altay/1784631/2a0000016ae31fddbc3c0312460e6e2e7e7c/XXXL',
		address: 'Дворцовая площадь, 2',
		location: {
			lat: 30.345363,
			lng: 59.911187,
		},
		creator: 'u1',
	},
	{
		id: 'p2',
		title: 'Эрмитаж1',
		description: 'Российский государственный музей изобразительного и декоративно-прикладного искусств, одно из крупнейших в мире учреждений подобного рода.',
		imageUrl: 'https://avatars.mds.yandex.net/get-altay/1784631/2a0000016ae31fddbc3c0312460e6e2e7e7c/XXXL',
		address: 'Дворцовая площадь, 2!!!',
		location: {
			lat: 30.345363,
			lng: 59.911187,
		},
		creator: 'u2',
	},
]

const UserPlaces = () => {
	const uid = useParams().uid;
	const filteredPlaces = DUMMY_PLACES.filter((place) => place.creator === uid);
	return (
		<PlaceList items={filteredPlaces} />
	)
};

export default UserPlaces;