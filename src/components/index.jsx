import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './index.css';
import { get_model_array } from './model';
import { get_comment } from '../actions';
import AddComment from '../container/addComments';
import VisibleComments from '../container/visibleComments';

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const array = get_model_array();
		if(array.length > 0) this.props.dispatch(get_comment(array))
	}

	render() {
		return (
			<div className="container">
				<AddComment />
				<VisibleComments />
			</div>
		);
	}
}

App.propTypes = ({
	dispatch: PropTypes.func.isRequired,
})

export default connect()(App)

