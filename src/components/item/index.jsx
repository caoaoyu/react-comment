import React from 'react';
import PropTypes from 'prop-types';

const Item =({ data }) => {
	return (
		<p className="show_comment">{data.text}</p>
	);
}

Item.prototype = ({
	data: PropTypes.object.isRequired,
})

export default Item