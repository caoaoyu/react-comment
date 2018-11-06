import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

export default class Modal extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillUnmount() {
	}

	render() {
		return (
			<div className='modal_show'>
				<p className="modal_context">{this.props.context}</p>
				<div className="operation">
					<p className="operating_close" onClick={this.props.handle_hide}>
						取消
					</p>
					<p className="operating_sure" onClick={this.props.handle_delete}>
						确认
					</p>
				</div>
			</div>
		);
	}
}

Modal.prototypes = {
	handle_hide: PropTypes.func.isRequired,
	handle_delete: PropTypes.func.isRequired,
	context: PropTypes.string.isRequired,
	type: PropTypes.string,
};
