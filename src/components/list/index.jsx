import React from 'react';
import Item from '../item/index';
import None from '../general/none/index';
import PropTypes from 'prop-types';
import './index.css';

const h_list = (array) => {
	return array.map((e,i) => <Item key={`comment-${i}`} data={e}/>)
}
const List = ({ comments }) => {
	return <div className="comment_list">{comments.length > 0 ? h_list(comments) : <None />}</div>;
};

List.propTypes = {
	comments: PropTypes.array.isRequired
};

export default List;
