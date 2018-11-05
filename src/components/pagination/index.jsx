import React from 'react';
import cs from 'classnames';
import './index.css';
import PropTypes from 'prop-types';
import { on_next, on_previous, on_pagination } from './model';

export default class Pagination extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			page_comment: []
		};
        this.pages_number = this.pages_number.bind(this);
        this.handle_next_page = this.handle_next_page.bind(this);
        this.handle_prev_page = this.handle_prev_page.bind(this);
	}

	pages_number() {
		const { pages_nums, now_page } = this.props;
		const item = (e) => (
			<p
				className={cs({ pages_number: true, now_page_number: e === now_page })}
				key={`page_${e}`}
				onClick={() => on_pagination(this.props, e)}
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
    
    handle_next_page() {
        on_next(this.props);
    }

    handle_prev_page() {
        on_previous(this.props);
    }

	render() {
        const { pages_nums, now_page } = this.props;
		const pre_icon = (
			<span
				className={cs({ pre_icon: true, pre_icon_active: now_page > 1 })}
				onClick={now_page > 1 ? () => on_pagination(this.props, now_page - 1) : null}
			>{`<`}</span>
		);
		const next_icon = (
			<span
				className={cs({ next_icon: true, next_icon_active: now_page < pages_nums })}
				onClick={now_page < pages_nums ? () => on_pagination(this.props, now_page + 1) : null}
			>{`>`}</span>
		);
		return (
			<div className="pagination_container">
				{pages_nums > 1 ? pre_icon : null}
				{pages_nums > 0 ? this.pages_number() : null}
				{pages_nums > 1 ? next_icon : null}
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
