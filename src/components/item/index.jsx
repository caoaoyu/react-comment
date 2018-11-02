import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
import cs from 'classnames';
import { timeToDate } from '../../../util/index';
import Modal from '../general/modal/index';
import { operction_del } from './model';

class Item extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			show_modal: false
		};
		this.handle_modal = this.handle_modal.bind(this);
		this.handle_hide = this.handle_hide.bind(this);
		this.handle_stroge = this.handle_stroge.bind(this);
	}

	handle_modal() {
		this.setState({ show_modal: true });
	}

	handle_hide() {
		this.setState({ show_modal: false });
	}

	handle_stroge(array, id) {
		let data = operction_del(array, id);
		this.props.handle_delete(data);
		return;
	}

	render() {
		const { comments, data, handle_delete } = this.props;
		return (
			<div className={cs({"show_comment": true, 'show_comment_delete': data.delete})}>
				<p>{data.text}</p>

				<div className="opticton_comment">
					<span className="comment_time">{timeToDate(data.time)}</span>
					{!data.delete ? (
						<span className="delete_comment" onClick={this.handle_modal}>
							删除
						</span>
					) : null}
				</div>
				{this.state.show_modal ? (
					<Modal
						handle_hide={this.handle_hide}
						handle_delete={() => this.handle_stroge(comments, data.id)}
						context="确定删除吗"
					/>
				) : null}
			</div>
		);
	}
}

Item.prototypes = {
	comments: PropTypes.array.isRequired,
	data: PropTypes.object.isRequired,
	handle_delete: PropTypes.func.isRequired
};

export default Item;
