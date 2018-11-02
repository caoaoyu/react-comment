import React from 'react';
import PropTypes from 'prop-types';
import './index.css'
import { timeToDate } from '../../../util/index'

const Item =({ data }) => {
	return (
		<p className="show_comment">{data.text}
		<span className='comment_time'>
			{timeToDate(data.time)}
		</span>
		</p>
	);
}

Item.prototype = ({
	data: PropTypes.object.isRequired,
})

export default Item