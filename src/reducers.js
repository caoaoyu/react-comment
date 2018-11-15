import { ADD_COMMENT, FIND_COMMENT, UPDATE_COMMENTS, DELTEL_GET_COMMENT, GET_COMMENT, SHOW_FIND, PAGINATION_PAGE, FETCH_ACTION, SHOW_GENRE } from './actions';
import update from 'react-addons-update';

const i_state = {
    comments: [],
    pages_nums: -1,
    now_page: 1,
    page_comment: [],
    one_max: 7,
    select_comments: [],
    select_active: 1
};
const comments_reducer = (state, action) => {
    state = state || i_state;
    switch (action.type) {
        case ADD_COMMENT:
            return general_update(state, action.payload);
        case FIND_COMMENT:
            return general_update(state, action.payload);
        case UPDATE_COMMENTS:
            return general_update(state, action.payload);
        case DELTEL_GET_COMMENT:
            return general_update(state, action.payload);
        case GET_COMMENT:
            return general_update(state, action.payload);
        case PAGINATION_PAGE:
            return general_update(state, action.payload);
        case SHOW_FIND:
            return general_update(state, action.payload);
        case SHOW_GENRE:
            return general_update(state, action.payload);
        case FETCH_ACTION:
            return { ...state, fetch_action: 'error' };
        default:
            return state;
    }
};

const general_update = (state, payload) => {
	// console.log(Object.assign({...state}, payload) )
	console.log(payload)
    return {
        ...state,
		...payload,
	};
}

export default comments_reducer;
