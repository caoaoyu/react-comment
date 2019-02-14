import { FIND_RESRT, USER_INFO } from './actions';
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
	cookie: {}
};
const comments_reducer = (state, action) => {
	state = state || i_state;

	switch (action.type) {
		case FIND_RESRT:
			state.select_search = '';
			return {
				...state
			};

		case USER_INFO:
			console.log(state, action);
			return user_stroage(state, action.payload);
		default:
			return {
				...state,
				...action.payload
			};
	}
};

const user_stroage = (state, payload) => {
	Cookies.set('account', payload.user.account);
	Cookies.set('password', payload.user.password);
	return {
        user: payload.user,
        account: payload.user.account,
        password: payload.user.password,
	};
};

export default comments_reducer;
