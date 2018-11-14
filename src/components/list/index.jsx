import React from 'react';
import Item from '../item/index';
import None from '../general/none/index';
import PropTypes from 'prop-types';
import './index.css';

const h_list = (array, func) => {
	return array.map((e, i) => (
		<Item key={`comment-${i}`} data={e} comments={array} fetch_delete={func} />
	));
};
const List = ({ comments, fetch_delete }) => {
	return (
		<div className="comment_list">
			{comments.length > 0 ? h_list(comments, fetch_delete, comments) : <None />}
		</div>
	);
};

List.propTypes = {
	comments: PropTypes.array.isRequired,
	fetch_delete: PropTypes.func.isRequired
};

export default List;
