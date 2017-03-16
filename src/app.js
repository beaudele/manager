import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
	componentWillMount() {
		// Initialize Firebase
		const config = {
			apiKey: 'AIzaSyBcPPDT7Of1j1jn6U9aLMJkVMQCJyzt5qI',
			authDomain: 'manager-12e1e.firebaseapp.com',
			databaseURL: 'https://manager-12e1e.firebaseio.com',
			storageBucket: 'manager-12e1e.appspot.com',
			messagingSenderId: '805593734528'
		};
		firebase.initializeApp(config);
	}
	render() {
		const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
		return (
			<Provider store={store}>
				<Router />
			</Provider>
		);
	}
}

export default App;
