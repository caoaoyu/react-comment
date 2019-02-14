import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './components/index';
import Login from './components/Login';

export default class AppRouter extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/" component={Login} />
					<Route path="/index" component={App} />
				</Switch>
			</Router>
		);
	}
}
