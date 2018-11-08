import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
import cs from 'classnames';
import { timeToDate } from '../../../util/index';
import Modal from '../general/modal/index';

class Item extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			show_modal: false
		};
		this.handle_modal = this.handle_modal.bind(this);
		this.handle_hide = this.handle_hide.bind(this);
		this.handle_delete = this.handle_delete.bind(this);
	}

	handle_modal() {
		this.setState({ show_modal: true });
	}

	handle_hide() {
		this.setState({ show_modal: false });
	}

	handle_delete(id) {
		this.handle_hide();
		this.props.fetch_delete(id);
		return;
	}

	render() {
		const { data } = this.props;

		return (
			<div className={cs({ show_comment: true, show_comment_delete: data.delete })}>
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
						handle_delete={() => this.handle_delete(data.id)}
						context="确定删除吗"
					/>
				) : null}
			</div>
		);
	}
}

Item.prototypes = {
	comments: PropTypes.array.isRequired,
	page_comment: PropTypes.array.isRequired,
	data: PropTypes.object.isRequired,
	fetch_delete: PropTypes.func.isRequired
};

export default Item;
