export const get_model_array = () => {
	const list_string = localStorage.comment;
	const array = list_string ? JSON.parse(list_string) : []
	return array;
};
