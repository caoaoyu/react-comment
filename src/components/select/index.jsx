import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

class SelectComment extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
        const {on_show_all, on_show_del, on_show_not_del } = this.props;
		return (
			<div className="select_container">
				<span onClick={on_show_all}>全部</span>
				<span onClick={on_show_del}>未删除</span>
				<span onClick={on_show_not_del}>已删除</span>
			</div>
		);
	}
}

SelectComment.prototypes = {
	comments: PropTypes.array.isRequired,
	on_show_all: PropTypes.func.isRequired,
	on_show_del: PropTypes.func.isRequired,
	on_show_not_del: PropTypes.func.isRequired
};

export default SelectComment;
