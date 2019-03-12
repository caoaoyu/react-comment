import React from 'react';
import Item from '../item/index';
import None from '../general/none/index';
import PropTypes from 'prop-types';
import './index.css';


const List = ({ comments, fetch_delete, update_context, reply_com }) => {
	return (
		<div className="comment_list">
			{comments.length > 0 ? comments.map((e, i) => (
				<Item 
					key={`comment-${i}`} 
					data={e}
					fetch_delete={fetch_delete}
					update_context={update_context}
					reply_com = {reply_com}
				/>
			)) : <None />}
		</div>
	);
};

List.propTypes = {
	comments: PropTypes.array.isRequired,
	fetch_delete: PropTypes.func.isRequired,
	update_context: PropTypes.func.isRequired,
	reply_com: PropTypes.func.isRequired,
};

export default List;
