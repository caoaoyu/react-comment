export const add_model = (params, text) => {
	let replace_text = text.replace(/\r\n/g, '<br/>'); //IE9、FF、chrome //空格处理
	let id = params.comments[params.comments.length - 1] ? params.comments[params.comments.length - 1].id + 1 : 1;
	let time = new Date().getTime();
	let comment = [ { id, text: replace_text, delete: false, time } ];
	var list = localStorage.comment;
	let array = list ? JSON.parse(list) : [];
	let comments = array.concat(comment);
	localStorage.setItem('comment', JSON.stringify(comments));
	const start = (params.now_page - 1) * params.one_max;
	const page_comment = comments.length < 7 ? comments : comments.slice(start, start + 7);
	params.on_add_click({ comments, page_comment, ids: comments.length });
	return;
};
