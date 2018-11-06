import React from 'react';
import Item from '../item/index';
import None from '../general/none/index';
import PropTypes from 'prop-types';
import './index.css';

const h_list = (array, func, comments) => {
	return array.map((e, i) => (
		<Item key={`comment-${i}`} data={e} page_comment={array} comments={comments} handle_delete={func} />
	));
};
const List = ({ page_comment, on_delte, comments }) => {
	return (
		<div className="comment_list">
			{page_comment.length > 0 ? h_list(page_comment, on_delte, comments) : <None />}
		</div>
	);
};

List.propTypes = {
	select_comments: PropTypes.array.isRequired,
	page_comment: PropTypes.array.isRequired,
	comments: PropTypes.array.isRequired,
	on_delte: PropTypes.func.isRequired
};

export default List;
