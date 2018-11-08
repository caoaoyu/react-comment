export const ADD_COMMENT = 'ADD_COMMENT';
export const FIND_COMMENT = 'FIND_COMMENT';
export const CHANGE_COMMENT = 'CHANGE_COMMENT';
export const DELTEL_COMMENT = 'DELTEL_COMMENT';
export const GET_COMMENT = 'GET_COMMENT';
export const FETCH_COMMENT = 'FETCH_COMMENT';
export const FETCH_ADD_COMMENT = 'FETCH_ADD_COMMENT';
export const SHOW_ALL = 'SHOW_ALL';
export const SHOW_FIND = 'SHOW_FIND';
export const SHOW_DELETEL = 'SHOW_DELETEL';
export const SHOW_NOT_DELETEL = 'SHOW_NOT_DELETEL';
export const PAGINATION_PAGE = 'PAGINATION_PAGE';
export const FETCH_ACTION = 'FETCH_ACTION';
export const DELTEL_FETCH_COMMENT = 'DELTEL_FETCH_COMMENT';

export const find_comment = (payload) => general_payload(FIND_COMMENT, payload);
export const change_comment = (payload) => general_payload(CHANGE_COMMENT, payload);
export const on_pagination_page = (payload) => general_payload(PAGINATION_PAGE, payload);
export const show_del = (payload) => general_payload(SHOW_DELETEL, payload);
export const show_not_del = (payload) => general_payload(SHOW_NOT_DELETEL, payload);
export const show_all = (payload) => general_payload(SHOW_ALL, payload);

const general_payload = (action, payload) => {
	return {
		type: action,
		payload
	};
};
