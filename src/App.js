import React from 'react';
import {
	BrowserRouter,
	Routes,
	Route
} from 'react-router-dom';

import routes from './routes';

import User from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation';

const App = () => (
  <BrowserRouter>
		<MainNavigation />
		<main>
			<Routes>
				<Route path={routes.userPlacesPath()} element={<UserPlaces />} />
				<Route path={routes.usersPagePath()} element={<User />} />
				<Route path={routes.newPlacePagePath()} element={<NewPlace />} />
				<Route path={routes.page404Path()} element={<h1>Page 404</h1>} />
			</Routes>
		</main>
	</BrowserRouter>
);

export default App;
