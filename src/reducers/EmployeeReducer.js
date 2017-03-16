import { 
	EMPLOYEES_FETCH_SUCCESS,
	EMPLOYEES_FETCHING
} from '../actions/types';


const INITIAL_STATE = {
	loading: false,
	employees: null
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case EMPLOYEES_FETCH_SUCCESS:
			return { ...state, employees: action.payload, loading: false };
		case EMPLOYEES_FETCHING:
			return { ...state, loading: true };
		default:
			return state;
	}
};
