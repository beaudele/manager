import { 
	EMPLOYEE_UPDATE,
	EMPLOYEE_CREATE,
	EMPLOYEE_CREATING,
	EMPLOYEE_SAVE,
	EMPLOYEE_SAVING,
	EMPLOYEE_DELETE,
	EMPLOYEE_DELETING
} from '../actions/types';

const INITIAL_STATE = {
	name: '',
	phone: '',
	shift: '',
	loading: false
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case EMPLOYEE_DELETE:
		case EMPLOYEE_SAVE:
		case EMPLOYEE_CREATE:
			return INITIAL_STATE;
		case EMPLOYEE_DELETING:
		case EMPLOYEE_CREATING:
		case EMPLOYEE_SAVING:
			return { ...state, loading: true };
		case EMPLOYEE_UPDATE:
			return { ...state, [action.payload.prop]: action.payload.value };
		default:
			return state;
	}
};
