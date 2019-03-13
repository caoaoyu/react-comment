import { FIND_RESRT, USER_INFO, HANDLE_ERROR } from './actions';
const Cookies = require('../util/cookies.min.js');

const i_state = {
    comments: [],
    pages_nums: -1,
    now_page: 1,
    page_comment: [],
    one_max: 7,
    select_comments: [],
    select_active: 1,
    select_search: '',
    user: {},
    cookie: {},
    error: 'false'
};
const comments_reducer = (state, action) => {
    state = state || i_state;

    switch (action.type) {
        case FIND_RESRT:
            return {
                ...state,
                select_search: ''
            };
        case HANDLE_ERROR:
            delete state.modal;
            delete state.modal_type;
            console.log('HANDLE_ERROR', state)
            const data = {
                ...state,
                ...action.payload
            };
            return data;
        case USER_INFO:
            return user_stroage(state, action.payload);
        default:
            return {
                ...state,
                ...action.payload
            };
    }
};

const user_stroage = (state, payload) => {
    if (payload.user) {
        const { user } = payload;
        Cookies.set('account', user.account);
        Cookies.set('password', user.password);
        localStorage.setItem('user', JSON.stringify(user));
        return {
            ...state,
            user,
            account: user.account,
            password: user.password
        };
    } else {
        return {
            ...state,
            error: payload.err
        };
    }
};

export default comments_reducer;
