import * as util from '../util/index';

export const fetch_user = (action, state) => {
	return util.Post('comments/login', { ...action.payload }).then((res) => {
		console.log(res);
		return { user: res.user };
	});
};

export const fetch_comments = (action, state) => {
	const select_active = action.type === 'SHOW_FETCH_COMMENTS' ? action.payload : state.select_active;
	const page = action.type === 'CHANGE_PAGE' ? action.payload : 1;
	const find_context = state.select_search.length > 1 ? `&find_context=${state.select_search}` : '';
	return util.Get(`comments/get?page=${page}&type=${select_active}${find_context}`).then((result) => {
		const { comments, pages_max } = result;
		if (comments.length <= 0) return { comments };
		return {
			comments,
			now_page: action.type === 'CHANGE_PAGE' ? action.payload : pages_max < 1 ? -1 : 1,
			pages_nums: pages_max,
			select_active
		};
	});
};

export const add_comment = (text) => {
	let replace_text = text.replace(/\r\n/g, '<br/>');
	let create_time = new Date().getTime().toString();
	let comment = { context: replace_text, state: 1, create_time };
	return util.Post('comments/add', comment).then((active) => active);
};

export const update_comments = (payload, state) => {
	async function update_result() {
		await util.Post('comments/update', { ...payload }).then((active) => active);
		return await util.Get(`comments/get?page=${state.now_page}&type=${state.select_active}`).then((res) => res);
	}
	return update_result().then((payload) => {
		return { comments: payload.comments };
	});
};

export const fetch_delete_comment = (id, state) => {
	async function del_result() {
		await util.Delete('comments/delete', { id }).then((res) => res);
		return await util.Get(`comments/get?type=${state.select_active}&page=1`).then((res) => res);
	}

	return del_result().then((result) => {
		const { comments, pages_max } = result;
		return {
			comments,
			now_page: 1,
			pages_nums: pages_max > 1 ? pages_max : -1
		};
	});
};

export const find_comment = (payload) => {
	return util.Post('comments/find', { find_context: payload }).then((res) => {
		return {
			select_search: payload,
			comments: res.comments,
			now_page: 1,
			pages_nums: res.pages_max > 1 ? res.pages_max : -1
		};
	});
};
