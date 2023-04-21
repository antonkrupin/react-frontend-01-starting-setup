import React, { useState, useCallback } from 'react';
import {
	BrowserRouter,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';

import User from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UpdatePlace from './places/pages/UpdatePlace';
import UserPlaces from './places/pages/UserPlaces';
import AuthPage from './user/pages/AuthPage';
import MainNavigation from './shared/components/Navigation/MainNavigation';

import routes from './routes';

import { AuthContext } from './shared/context/Auth-context';

const App = () => {
	const [token, setToken] = useState(false);
	const [userId, setUserId] = useState(false);

	const login = useCallback((uid, token) => {
		setToken(token);
		setUserId(uid);
	}, []);

	const logout = useCallback(() => {
		setToken(null);
		setUserId(null);
	}, []);

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: !!token,
				userId: userId,
				token: token,
				login,
				logout
			}}
		>
			<BrowserRouter>
				<MainNavigation />
				<main>
					<Routes>
						<Route path={routes.userPlacesPath()} element={<UserPlaces />} />
						<Route path={routes.usersPagePath()} element={<User />} />
						<Route path={routes.newPlacePagePath()} element={<NewPlace />} />
						<Route path={routes.updatePlacePath()} element={<UpdatePlace />} />
						<Route path={routes.authPagePath()} element={!token ? <AuthPage /> : <Navigate replace to={routes.usersPagePath()} />} />
						<Route path={routes.page404Path()} element={<h1>Page 404</h1>} />
					</Routes>
				</main>
			</BrowserRouter>
		</AuthContext.Provider>
	)
};

export default App;
