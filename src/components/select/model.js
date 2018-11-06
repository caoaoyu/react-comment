export const general_classfly = (array, type, max, func) => {
    const select_active = type;
    const select_array = select_comments(array, type)
    const pages_nums = select_array.length > 7 ? Math.ceil(select_array.length / max) : -1;
    const page_comment = select_array.length > 7 ?  select_array.slice(0, 7) : select_array;
	const data = {
        select_active,
        page_comment,
        now_page: 1,
		select_comments: select_comments(array, type),
		pages_nums
	};
	func(data);
	return;
};

const select_comments = (array, type) => {
    switch (type) {
        case 'not':
            return array.filter((v) => !v.delete);
        case 'del':
            return array.filter((v) => v.delete);
        default:
            return array;
    }
};
