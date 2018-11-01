// import { combineReducers } from 'redux'

const comments_reducer = (state, action) => {
	state = state || { comments: [] };
	console.log('comments_reducer', state, 'action', action);
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
		default:
			return state;
	}
};

const get = (state, payload) => {
	state.comments = payload;
	console.log('GET_COMMENT', state, payload);
	return { ...state};
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
	console.log('DELTEL_COMMENT', { ...state, ...payload });
	return { ...state, ...payload };
};

export default comments_reducer;
