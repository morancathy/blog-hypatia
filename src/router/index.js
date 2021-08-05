import React from 'react';
import NavBar from '../components/NavBar';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Show from '../pages/Post';
import routes from './routes';

const AppRouter = () => {
	return (
		<Router>
			<NavBar routes={routes} />
			<Switch>
				{routes.map(({ Component, key, path }) => (
					<Route
						key={key}
						path={path}
						exact
						component={() => <Component page={key} />}
					></Route>
				))}
				<Route
					path={'/:id'}
					render={routerProps => <Show {...routerProps} />}
				></Route>
			</Switch>
		</Router>
	);
};
export default AppRouter;

//updated the route with path /id. MADE A DYNATIC ROUTE. That id gets put in
// props.match.params.id      GIVE IT THE ROUTER PROPS
// that is front end version of req.params.id....
//depending on which id i link to depends on props.match.params.id
