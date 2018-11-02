export const get_model_array = (max) => {
	console.log(max)
	const list_string = localStorage.comment;
	const array = list_string ? JSON.parse(list_string) : [];
	if (array.length <= 0) return {comments: array};
	if (array.length < 7) {
		return {
			comments: array,
			page_comment: array,
		};
	}
	return {
		comments: array,
		page_comment: array.slice(0, 7),
		pages_nums: Math.ceil(array.length / max)
	};
};
