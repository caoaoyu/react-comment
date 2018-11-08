import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './index.css';
import AddComment from '../container/addComments';
import VisibleComments from '../container/visibleComments';
import SettingPages from '../container/settingPages';
import SelectComment from '../container/selectContainer';
class App extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.fetch_comments()
	}

	render() {
		return (
			<div className="container">
				<AddComment />
				<SelectComment />
				<VisibleComments />
				<SettingPages />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		one_max: state.one_max
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetch_comments: () => {
			dispatch({type:'FETCH_COMMENT'});
		}
	};
};

App.propTypes = {
	dispatch: PropTypes.func.isRequired,
	one_max: PropTypes.number,
	fetch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
