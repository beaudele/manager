import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { 
	EMAIL_CHANGED, 
	PWD_CHANGED, 
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGIN
} from './types';

export const emailChanged = (text) => {
	return {
		type: EMAIL_CHANGED,
		payload: text
	};
};

export const pwdChanged = (text) => {
	return {
		type: PWD_CHANGED,
		payload: text
	};
};

const loginUserSuccess = (dispatch, user) => {
	dispatch({ 
		type: LOGIN_SUCCESS, 
		payload: user 
	});
	Actions.main();
};

const loginUserFail = (dispatch) => {
	dispatch({ 
		type: LOGIN_FAIL
	});
};

export const loginUser = ({ email, pwd }) => {
	return (dispatch) => {
		dispatch({ 
			type: LOGIN
		});
		firebase.auth().signInWithEmailAndPassword(email, pwd)
			.then(user => loginUserSuccess(dispatch, user))
			.catch((error) => {
				console.log(error);
				firebase.auth().createUserWithEmailAndPassword(email, pwd)
				.then(user => loginUserSuccess(dispatch, user))
				.catch(() => loginUserFail(dispatch));
			});
	};
};
