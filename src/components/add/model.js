export const add_model = (params, text) => {
	const data = params.comments;
	let replace_text = text.replace(/\r\n/g, '<br/>'); //IE9、FF、chrome //空格处理
	let id = data[data.length - 1] ? data[0].id + 1 : 1;
	let time = new Date().getTime();
	let comment = [ { id, text: replace_text, delete: false, time } ];
	var list = localStorage.comment;
	let array = list ? JSON.parse(list) : [];
	let comments = array.concat(comment);
	localStorage.setItem('comment', JSON.stringify(comments));
	const start = 0; //(params.now_page - 1) * params.one_max;
	const sort_comment = comments.sort((a, b) => b.time - a.time);
	const page_comment = sort_comment.length < 7 ? sort_comment : sort_comment.slice(start, start + 7);
	params.on_add_click({
		comments: sort_comment,
		page_comment,
		ids: comments.length,
		select_active: 'all'
	});
	return;
};
