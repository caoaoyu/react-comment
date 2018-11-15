import { FIND_RESRT, FIND_COMMENT_SUCCESS, UPDATE_COMMENTS, DELTEL_GET_COMMENT, GET_COMMENT, SHOW_FIND, PAGINATION_PAGE, FETCH_ACTION, SHOW_GENRE } from './actions';

const i_state = {
    comments: [],
    pages_nums: -1,
    now_page: 1,
    page_comment: [],
    one_max: 7,
    select_comments: [],
    select_active: 1,
    select_search: ''
};
const comments_reducer = (state, action) => {
    state = state || i_state;

    switch (action.type) {
        case FIND_RESRT:
            state.select_search = '';
            return {
                ...state
        };
        // case FIND_COMMENT_SUCCESS:
        //     return general_update(state, action.payload);
        // case UPDATE_COMMENTS:
        //     return general_update(state, action.payload);
        // case DELTEL_GET_COMMENT:
        //     return general_update(state, action.payload);
        // case GET_COMMENT:
        //     return general_update(state, action.payload);
        // case PAGINATION_PAGE:
        //     return general_update(state, action.payload);
        // case SHOW_FIND:
        //     return general_update(state, action.payload);
        // case SHOW_GENRE:
        //     return general_update(state, action.payload);
        // case FETCH_ACTION:
        //     return { ...state, fetch_action: 'error' };
        default:
            return {
                ...state,
                ...action.payload
            };
    }
};

const general_update = (state, payload) => {
    return {
        ...state,
        ...payload
    };
};

export default comments_reducer;
