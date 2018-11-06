import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
import { general_classfly } from './model';

class SelectComment extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { on_show_all, on_show_del, on_show_not, select_active, comments, one_max } = this.props;
		return (
			<div className="select_container">
				<span
					className={select_active === 'all' ? 'select_active_icon' : null}
					onClick={() => general_classfly(comments, "all", one_max, on_show_all)}
				>
					全部
				</span>
				<span
					className={select_active === 'not' ? 'select_active_icon' : null}
					onClick={() => general_classfly(comments, "not", one_max, on_show_not)}
				>
					未删除
				</span>
				<span
					className={select_active === 'del' ? 'select_active_icon' : null}
					onClick={() => general_classfly(comments, "del",  one_max, on_show_del)}
				>
					已删除
				</span>
			</div>
		);
	}
}

SelectComment.prototypes = {
	comments: PropTypes.array.isRequired,
	select_comments: PropTypes.array.isRequired,
    select_active: PropTypes.string.isRequired,
    one_max: PropTypes.number.isRequired,
	on_show_all: PropTypes.func.isRequired,
	on_show_del: PropTypes.func.isRequired,
	on_show_not: PropTypes.func.isRequired
};

export default SelectComment;
