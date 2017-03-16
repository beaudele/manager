import { 
	EMAIL_CHANGED, 
	PWD_CHANGED, 
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGIN
} from '../actions/types';

const INITIAL_STATE = {
	email: '',
	pwd: '',
	loading: false,
	error: '',
	user: null
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case EMAIL_CHANGED:
			return { ...state, email: action.payload };
		case PWD_CHANGED:
			return { ...state, pwd: action.payload };
		case LOGIN:
			return { ...state, loading: true, error: '' };
		case LOGIN_SUCCESS:
			return { ...state, ...INITIAL_STATE, user: action.payload };
		case LOGIN_FAIL:
			return { ...state, error: 'Authentication failed', pwd: '', loading: false };
		default:
			return state;
	}
};
