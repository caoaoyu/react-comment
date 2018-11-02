import React from 'react';
import Item from '../item/index';
import None from '../general/none/index';
import PropTypes from 'prop-types';
import './index.css';

const h_list = (array, func) => {
	return array.map((e,i) => <Item key={`comment-${i}`} data={e} page_comment={array} handle_delete={func}/>)
}
const List = ({ page_comment, on_deltel }) => {
	return <div className="comment_list">{page_comment.length > 0 ? h_list(page_comment, on_deltel) : <None />}</div>;
};

List.propTypes = {
	page_comment: PropTypes.array.isRequired,
	on_deltel: PropTypes.func.isRequired,
};

export default List;
