export const get_model_array = (max) => {
	const url = `${window.location.search}?page=1`;
	const list_string = localStorage.comment;
	const array = list_string ? JSON.parse(list_string) : [];
	if (array.length <= 0) return { comments: array };
	const comments = array.sort((a, b) => b.time - a.time);
	if (array.length < 7) {
		return {
			comments,
			page_comment: comments
		};
	}
	return {
		comments,
		page_comment: comments.slice(0, 7),
		pages_nums: Math.ceil(comments.length / max)
	};
};
