export default {
	usersPagePath: () => '/',
	newPlacePagePath: () => '/places/new',
	updatePlacePath: () => '/places/:pid',
	page404Path: () => '*',
	userPlacesPath: () => `/:uid/places`,
	authPagePath: () => '/auth',
};