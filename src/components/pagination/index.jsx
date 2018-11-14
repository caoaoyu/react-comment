import React from 'react';
import cs from 'classnames';
import './index.css';
import PropTypes from 'prop-types';
// import { on_next, on_previous, on_pagination } from './model';

export default class Pagination extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			page_comment: []
		};
        this.pages_number = this.pages_number.bind(this);
	}

	pages_number(on_pagination) {
		const { pages_nums, now_page } = this.props;
		const item = (e) => (
			<p
				className={cs({ pages_number: true, now_page_number: e === now_page })}
				key={`page_${e}`}
				onClick={() => on_pagination(e)}
			>
				{e}
			</p>
		);

		const list = (
			<div className="page_numbers">
				{Array.from({ length: pages_nums + 1 }, (e, i) => {
					if (i > 0) return item(i);
				})}
			</div>
		);
		return list;
    }
    
	render() {
        const { pages_nums, now_page, on_pagination } = this.props;
		const pre_icon = (
			<span
				className={cs({ pre_icon: true, pre_icon_active: now_page > 1 })}
				onClick={now_page > 1 ? () => on_pagination(now_page - 1) : null}
			>{`<`}</span>
		);
		const next_icon = (
			<span
				className={cs({ next_icon: true, next_icon_active: now_page < pages_nums })}
				onClick={now_page < pages_nums ? () => on_pagination(now_page + 1) : null}
			>{`>`}</span>
		);
		return (
			<div className="pagination_container">
				{pages_nums > 1 ? pre_icon : null}
				{pages_nums > 0 ? this.pages_number(on_pagination) : null}
				{pages_nums > 1 ? next_icon : null}
			</div>
		);
	}
}

Pagination.prototypes = {
	on_pagination: PropTypes.func.isRequired,
	comments: PropTypes.array,
	now_page: PropTypes.number,
	pages_nums: PropTypes.number
};
