import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import { 
	EMPLOYEE_UPDATE,
	EMPLOYEE_CREATE,
	EMPLOYEE_CREATING,
	EMPLOYEES_FETCH_SUCCESS,
	EMPLOYEES_FETCHING,
	EMPLOYEE_SAVE,
	EMPLOYEE_SAVING,
	EMPLOYEE_DELETE,
	EMPLOYEE_DELETING
} from './types';

export const employeeUpdate = ({ prop, value }) => {
	return {
		type: EMPLOYEE_UPDATE,
		payload: { prop, value }
	};
};

export const employeeCreate = ({ name, phone, shift }) => {
	const { currentUser } = firebase.auth();
	return (dispatch) => {
		dispatch({ type: EMPLOYEE_CREATING });
		firebase.database().ref(`/users/${currentUser.uid}/employees`)
			.push({ name, phone, shift })
				.then(() => {
					dispatch({ type: EMPLOYEE_CREATE });
					Actions.employeeList({ type: 'reset' });
				});
	};
};

export const employeesFetch = () => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
	dispatch({ type: EMPLOYEES_FETCHING });
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .on('value', snapshot => {
        dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const employeeSave = ({ name, phone, shift, uid }) => {
	const { currentUser } = firebase.auth();
	return (dispatch) => {
		dispatch({ type: EMPLOYEE_SAVING });
		firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
			.set({ name, phone, shift })
				.then(() => {
					dispatch({ type: EMPLOYEE_SAVE });
					Actions.employeeList({ type: 'reset' });
				});
	};
};

export const employeeDelete = ({ uid }) => {
	const { currentUser } = firebase.auth();
	return (dispatch) => {
		dispatch({ type: EMPLOYEE_DELETING });
		firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
			.remove()
				.then(() => {
					dispatch({ type: EMPLOYEE_DELETE });
					Actions.employeeList({ type: 'reset' });
				});
	};
};
