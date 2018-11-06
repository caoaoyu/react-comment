export const on_pagination = (params, num) => {
	const { select_comments, one_max, pages_nums, on_pagination_page } = params;
	const start = (num - 1) * one_max;
	const end = start + 7
	const page_comment = pages_nums > num ? select_comments.slice(start, end) : select_comments.slice(start);
	const now_page = num;

	on_pagination_page({
		page_comment,
		now_page,
	});
	return;
};
