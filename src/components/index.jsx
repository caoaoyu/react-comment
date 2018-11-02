import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './index.css';
import { get_model_array } from './model';
import { get_comment } from '../actions';
import AddComment from '../container/addComments';
import VisibleComments from '../container/visibleComments';
import SettingPages from '../container/settingPages';

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const data = get_model_array(this.props.one_max);
		if(data.comments.length > 0) this.props.dispatch(get_comment(data))
	}

	render() {
		return (
			<div className="container">
				<AddComment />
				<VisibleComments />
				<SettingPages />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return{
		one_max: state.one_max,
	}
};

App.propTypes = ({
	dispatch: PropTypes.func.isRequired,
	one_max: PropTypes.number,
})

export default connect(mapStateToProps)(App)

