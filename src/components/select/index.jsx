import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

class SelectComment extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="select_container">
				<span>全部</span>
				<span>未删除</span>
				<span>已删除</span>
			</div>
		);
	}
}

export default SelectComment;
