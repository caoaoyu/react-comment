export const on_pagination = (params, num) => {
	const { comments, one_max, pages_nums, on_pagination_page } = params;
	const page_comment = pages_nums > num ? comments.slice((num - 1) * one_max, 7) : comments.slice((num - 1) * one_max);
	const now_page = num;

	on_pagination_page({
		page_comment,
		now_page
	});
	return;
};
