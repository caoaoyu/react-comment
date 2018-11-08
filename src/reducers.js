import {
	ADD_COMMENT,
	FIND_COMMENT,
	CHANGE_COMMENT,
	DELTEL_COMMENT,
	GET_COMMENT,
	SHOW_ALL,
	SHOW_FIND,
	SHOW_DELETEL,
	SHOW_NOT_DELETEL,
	PAGINATION_PAGE,
	FETCH_ACTION
} from './actions';

const i_state = {
	comments: [],
	pages_nums: -1,
	now_page: 1,
	page_comment: [],
	one_max: 7,
	select_comments: [],
	select_active: 'all'
};
const comments_reducer = (state, action) => {
	state = state || i_state;
	switch (action.type) {
		case ADD_COMMENT:
			return add(state, action.payload);
		case FIND_COMMENT:
			return find(state, action.payload);
		case CHANGE_COMMENT:
			return change(state, action.payload);
		case DELTEL_COMMENT:
			return deletel(state, action.payload);
		case GET_COMMENT:
			return get(state, action.payload);
		case PAGINATION_PAGE:
			return pagination(state, action.payload);
		case SHOW_FIND:
			return show_find(state, action.payload);
		case SHOW_DELETEL:
			return show_del(state, action.payload);
		case SHOW_ALL:
			return show_all(state, action.payload);
		case SHOW_NOT_DELETEL:
			return show_not_del(state, action.payload);
		case FETCH_ACTION:
			return { ...state, fetch_action: 'error' };
		default:
			return state;
	}
};

const get = (state, payload) => {
	return {
		...state,
		...payload
	};
};

const add = (state, payload) => {
	return {
		...state,
		...payload,
		select_comments: payload.comments
	};
};

const find = (state, payload) => {};

const change = (state, payload) => {};

const deletel = (state, payload) => {
	return {
		...state,
		...payload
	};
};

const pagination = (state, payload) => {
	return {
		...state,
		...payload
	};
};

const show_del = (state, payload) => {
	return {
		...state,
		...payload
	};
};

const show_not_del = (state, payload) => {
	return {
		...state,
		...payload
	};
};

const show_all = (state, payload) => {
	return {
		...state,
		...payload
	};
};

export default comments_reducer;
