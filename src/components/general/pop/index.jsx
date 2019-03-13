import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

export default class Pop extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='pop_show'>
				<p className="pop_context">{this.props.context}</p>
				<div className="pop_operation">
					<p className="pop_operating_close" onClick={this.props.handle_hide}>
						取消
					</p>
					<p className="pop_operating_sure" onClick={this.props.handle_delete}>
						确认
					</p>
				</div>
			</div>
		);
	}
}

Pop.prototypes = {
	handle_hide: PropTypes.func.isRequired,
	handle_delete: PropTypes.func.isRequired,
	context: PropTypes.string.isRequired,
	type: PropTypes.string,
};
