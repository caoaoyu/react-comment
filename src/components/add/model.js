export const add_model = (data, len, text) => {
	let replace_text = text.replace(/\r\n/g, '<br/>'); //IE9、FF、chrome //空格处理
	let id = data[len - 1] ? data[len - 1].id + 1 : 1;
	let time = new Date().getTime();
	let comment = [ { id, text: replace_text, delete:false, time} ];
	var list = localStorage.comment;
	let array = list ? JSON.parse(list) : [];
	let comments = array.concat(comment);
	localStorage.setItem('comment', JSON.stringify(comments));
	return comments;
};
