import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/index';
import Login from './components/Login';
import store from './store';
import AppRouter from './router'

render(
	<Provider store={store}>
    	<AppRouter />
	</Provider>,
	document.getElementById('app')
);