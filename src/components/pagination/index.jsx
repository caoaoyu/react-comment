import React from 'react';
import cs from 'classnames';
import './index.css';
import PropTypes from 'prop-types';

export default class Pagination extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			page_comment: []
		};
		this.pages_number = this.pages_number.bind(this);
	}

	pages_number(num) {
		let items = [];
		const item = (e) => (
			<li className="pages_number" key={`page_${e}`} onClick={this.props.next_comment}>
				{e}
			</li>
		);
		for (var i = 0; i <= num; i++) {
			items.push(item(i));
		}
		const list = <ol className="numbers">{items}</ol>;
		return list;
	}

	render() {
		return (
			<div className="pagination_container">
				{this.props.pages_nums > 0 ? this.pages_number(this.props.pages_nums) : null}
			</div>
		);
	}
}

Pagination.prototypes = {
	comments: PropTypes.array,
	now_page: PropTypes.number,
	one_max: PropTypes.number,
	page_comment: PropTypes.array,
	pages_nums: PropTypes.number
};
