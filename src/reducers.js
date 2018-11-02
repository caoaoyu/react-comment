import { next_page } from './actions';

// import { combineReducers } from 'redux'

const comments_reducer = (state, action) => {
	state = state || { comments: [], pages_nums: -1, now_page: 1, page_comment: [], one_max: 7 };
	switch (action.type) {
		case 'ADD_COMMENT':
			return add(state, action.payload);
		case 'FIND_COMMENT':
			return find(state, action.payload);
		case 'CHANGE_COMMENT':
			return change(state, action.payload);
		case 'DELTEL_COMMENT':
			return deletel(state, action.payload);
		case 'GET_COMMENT':
			return get(state, action.payload);
		case 'NEXT_PAGE':
			return next(state, action.payload);
		case 'PREVIOUS_PAGE':
			return previous(state, action.payload);
		default:
			return state;
	}
};

// const visible_comments = (list, filter) => {
// 	switch (filter) {
// 		case 'SHOW_Find':
// 			return list.filter((e) => e.id !== filter.id);
// 		case 'SHOW_DELETEL':
// 			return list.filter((e) => !e.deltel);
// 		case 'SHOW_ALL':
// 			return list;
// 		default:
// 			return list;
// 	}
// };

const get = (state, payload) => {
	// state.comments = payload.comments;
	console.log('GET_COMMENT', state, payload);
	return { ...payload };
};

const add = (state, payload) => {
	console.log('ADD_COMMENT', { ...state, ...payload });
	return { ...state, ...payload };
};

const find = (state, payload) => {
	console.log('FIND_COMMENT', state);
	return { ...state, ...payload };
};

const change = (state, payload) => {
	console.log('CHANGE_COMMENT', { ...state, ...payload });
	return { ...state, ...payload };
};

const deletel = (state, payload) => {
	state.comments = payload;
	console.log('DELTEL_COMMENT', { ...state, ...payload });
	return { ...state };
};

const next = (state, payload) => {
	console.log('DELTEL_COMMENT', { ...state, ...payload });
	return { ...state };
};

const previous = (state, payload) => {
	console.log('DELTEL_COMMENT', { ...state, ...payload });
	return { ...state };
};

export default comments_reducer;
