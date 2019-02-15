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
			console.log('HANDLE_ERROR', state);
			return Object.assign({
				...state,
				error: 'false'
			});
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
		Cookies.set('account', payload.user.account);
		Cookies.set('password', payload.user.password);
		return {
			...state,
			user: payload.user,
			account: payload.user.account,
			password: payload.user.password
		};
	} else {
		return {
			...state,
			error: payload.err
		};
	}
};

export default comments_reducer;
